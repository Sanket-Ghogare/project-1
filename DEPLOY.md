# Deploy to Hostinger VPS — Step by Step

This guide takes a fresh Hostinger VPS (Ubuntu 22.04 / 24.04) and puts the
Great Ocean Comptech Pvt Ltd site online at `https://www.gocpl.co.in` in
under 30 minutes.

**Stack:** Next.js 16 (standalone) in Docker → Nginx reverse proxy →
Let's Encrypt TLS. Emails delivered via BigRock cPanel SMTP.
No database — contact form submissions go out as email only.

---

## 0. Before you start

Make sure you have:
- **Hostinger VPS credentials** — root SSH access + public IP
- **Domain DNS access** (GoDaddy / registrar) — to point `gocpl.co.in` at the VPS
- **BigRock email account credentials** for `asked@gocpl.co.in`
  (used as SMTP user — host `sh00002.bigrock.com`, port `465`, SSL)
- **DNS email records** already published (see §5 below):
  SPF, DKIM, DMARC — required for inbox delivery

---

## 1. One-time VPS setup (run once per server)

SSH into the VPS as root:

```bash
ssh root@YOUR_VPS_IP
```

### 1a. Create a non-root user (security best practice)

```bash
adduser gocpl
usermod -aG sudo gocpl
rsync --archive --chown=gocpl:gocpl ~/.ssh /home/gocpl
```

Then log out and log back in as `gocpl`:

```bash
ssh gocpl@YOUR_VPS_IP
```

### 1b. Install Docker + Docker Compose

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker   # refresh group membership without logout
docker --version && docker compose version
```

### 1c. Install Nginx + Certbot (for HTTPS)

```bash
sudo apt install -y nginx certbot python3-certbot-nginx ufw
```

### 1d. Open the firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

---

## 2. Deploy the app

### 2a. Clone your repository

The repo is **private**, so you need either an SSH key registered with
GitHub or a Personal Access Token (PAT).

**Option A — SSH (recommended, one-time setup):**

```bash
# On the VPS, generate a key if you don't have one
ssh-keygen -t ed25519 -C "gocpl-vps" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

Copy the output, paste it at https://github.com/settings/keys → "New SSH key".
Then clone:

```bash
cd ~
git clone git@github.com:Sanket-Ghogare/freelancer-1.git gocpl-web
cd gocpl-web
```

**Option B — HTTPS with a Personal Access Token:**

Create a PAT at https://github.com/settings/tokens (scope: `repo`).
Then clone with the token inline once — Git will cache it:

```bash
cd ~
git clone https://YOUR_GITHUB_PAT@github.com/Sanket-Ghogare/freelancer-1.git gocpl-web
cd gocpl-web
```

> Both options clone into a folder called `gocpl-web` to keep the
> rest of this guide's paths (`~/gocpl-web`) working as-is.

### 2b. Create the `.env.local` file on the server

```bash
nano .env.local
```

Paste this — **use the real BigRock password**, never commit this file:

```env
# BigRock cPanel SMTP
SMTP_HOST=sh00002.bigrock.com
SMTP_PORT=465
SMTP_USER=asked@gocpl.co.in
SMTP_PASS=YOUR_BIGROCK_PASSWORD_HERE
SMTP_FROM="Great Ocean Comptech <asked@gocpl.co.in>"

# Where enquiries are sent
COMPANY_EMAIL=asked@gocpl.co.in

# Public site URL (used in email links)
NEXT_PUBLIC_SITE_URL=https://www.gocpl.co.in
```

Save with **Ctrl+O, Enter, Ctrl+X**, then lock down the file:

```bash
chmod 600 .env.local
```

> If the password contains `$` characters you **must** escape each one
> as `\$` — otherwise Next.js expands it as an env-var reference and
> your SMTP login will silently break.

### 2c. Build and start the container

```bash
docker compose up -d --build
```

Watch the logs until you see `Ready on http://0.0.0.0:3000`:

```bash
docker compose logs -f web
```

Press **Ctrl+C** to exit the log view (the container keeps running).

### 2d. Test locally from the VPS

```bash
curl -I http://127.0.0.1:3000
```

Should return `HTTP/1.1 200 OK`.

---

## 3. Hook up Nginx + HTTPS

### 3a. Point DNS

In your domain registrar (GoDaddy → DNS), create:

| Type | Host  | Value         | TTL   |
|------|-------|---------------|-------|
| A    | `@`   | `YOUR_VPS_IP` | 1 hr  |
| A    | `www` | `YOUR_VPS_IP` | 1 hr  |

Wait 5–10 minutes for DNS propagation. Verify:

```bash
dig +short gocpl.co.in
dig +short www.gocpl.co.in
```

### 3b. Create the Nginx site config

```bash
sudo nano /etc/nginx/sites-available/gocpl
```

Paste:

```nginx
server {
    listen 80;
    server_name gocpl.co.in www.gocpl.co.in;

    # Proxy to the Next.js container bound on localhost:3000
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass                 $http_upgrade;
        proxy_read_timeout                 60s;
    }

    # Larger bodies for future file-upload fields
    client_max_body_size 10M;
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/gocpl /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # remove the welcome page
sudo nginx -t                               # test config
sudo systemctl reload nginx
```

### 3c. Get a free Let's Encrypt SSL certificate

```bash
sudo certbot --nginx -d gocpl.co.in -d www.gocpl.co.in
```

Follow the prompts. Choose **redirect HTTP to HTTPS** when asked.

Certbot auto-renews every 60 days. Verify the renewal timer:

```bash
sudo systemctl status certbot.timer
```

---

## 4. You're live 🎉

Open `https://www.gocpl.co.in` — should load with a valid SSL cert.

Test the contact form and watch the container logs:

```bash
docker compose logs -f web
```

You should see:

```
[Contact API] ✓ Company notification sent to asked@gocpl.co.in
[Contact API] ✓ User confirmation sent to <user>@example.com
```

---

## 5. DNS email records (critical for inbox delivery)

Publish these in GoDaddy DNS before going live — otherwise outgoing
emails land in spam, or are silently dropped by Gmail.

| Type | Host     | Value                                                    |
|------|----------|----------------------------------------------------------|
| TXT  | `@`      | `v=spf1 +mx +a +ip4:66.116.229.253 ~all`                 |
| TXT  | `default._domainkey` | `v=DKIM1; k=rsa; p=...` (from BigRock cPanel) |
| TXT  | `_dmarc` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:asked@gocpl.co.in;` |

Verify from anywhere:

```bash
dig +short TXT gocpl.co.in
dig +short TXT default._domainkey.gocpl.co.in
dig +short TXT _dmarc.gocpl.co.in
```

> **Known issue:** BigRock shared IPs have weak reputation with Gmail.
> If user confirmation emails don't arrive in the submitter's inbox,
> switch `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` to a transactional
> provider (Brevo / Resend / MailerSend — all free up to 300/day).
> No code change needed — only the three env vars.

---

## 6. Day-to-day operations

### Deploy a new version

```bash
cd ~/gocpl-web
git pull
docker compose up -d --build
docker image prune -f        # clean old image layers
```

### View logs

```bash
docker compose logs -f web           # live tail
docker compose logs --tail=200 web   # last 200 lines
```

### Restart the app (without rebuild)

```bash
docker compose restart web
```

### Stop / start

```bash
docker compose down
docker compose up -d
```

### Update environment variables

```bash
nano .env.local
docker compose up -d --force-recreate   # picks up the new env vars
```

### Check container health

```bash
docker compose ps
docker stats gocpl-web
```

---

## 7. Troubleshooting

| Symptom | Fix |
|---------|-----|
| `502 Bad Gateway` in browser | Container crashed — run `docker compose logs web` |
| `EAUTH / Invalid login` | Wrong BigRock password, or unescaped `$` in `.env.local` |
| `getaddrinfo ENOTFOUND` | Wrong `SMTP_HOST` — must be `sh00002.bigrock.com` |
| Emails sent, but Gmail never receives | BigRock IP reputation — switch to Brevo (see §5) |
| SSL renewal fails | `sudo certbot renew --dry-run` — fix Nginx if it shows errors |
| Out of memory | Reduce `memory: 512M` in `docker-compose.yml` or upgrade VPS plan |
| Port 3000 already in use | `sudo lsof -i :3000` — kill the old process |
| Rate-limit error on form | Limit is 5/hr per IP — adjust `RATE_LIMIT_MAX` in `app/api/contact/route.ts` |

---

## 8. Recommended VPS specs

| Traffic | CPU | RAM | Storage | Hostinger plan |
|---------|-----|-----|---------|----------------|
| < 10k visits/month | 1 vCPU | 1 GB | 20 GB | **KVM 1** |
| 10k – 50k / month  | 2 vCPU | 2 GB | 40 GB | **KVM 2** (recommended) |
| 50k+ / month       | 4 vCPU | 4 GB | 80 GB | **KVM 4** |

The Docker image is ~150 MB, the running container uses ~200–400 MB RAM idle.

---

## 9. Security checklist

- [ ] `.env.local` has `chmod 600` (not world-readable)
- [ ] SSH uses keys, not passwords (disable password auth in `/etc/ssh/sshd_config`)
- [ ] `ufw` firewall is active with only 22, 80, 443 open
- [ ] Docker container runs as non-root user `nextjs` (already configured)
- [ ] Let's Encrypt certificate auto-renewal timer is active
- [ ] Hostinger VPS has automatic security updates enabled (`unattended-upgrades`)
- [ ] SPF / DKIM / DMARC records published and verified
- [ ] Contact form rate-limiting active (built in — 5 req/hr/IP)
- [ ] Honeypot field active in ContactForm (built in — silent bot drop)
