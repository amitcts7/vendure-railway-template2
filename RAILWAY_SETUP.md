# Railway Deployment Guide — Vendure v3.5.5 + Next.js Storefront

Complete step-by-step instructions to deploy the full stack on Railway:

| Service | What it does |
|---|---|
| **Vendure Server** | Backend API, Admin Dashboard, Shop API |
| **PostgreSQL** | Database (managed by Railway) |
| **Next.js Storefront** | Customer-facing shop (optional) |
| **Worker** | Background job queue (optional, recommended for production) |
| **MinIO** | Self-hosted asset storage (optional) |

---

## Prerequisites

- GitHub account with this repo pushed (public or private)
- Railway account — [railway.com](https://railway.com)

```bash
# Push the repo to GitHub first (includes the storefront submodule)
git submodule update --init --recursive
git add .
git commit -m "Vendure 3.5.5 + Next.js storefront"
git push origin master
```

---

## Part 1 — Create a New Railway Project

1. Go to [railway.com](https://railway.com) → click **New Project**
2. Choose **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub account if prompted
4. Select your repository → click **Deploy Now**

Railway creates the **Vendure server** service and begins the first build.

> **Build note:** This template uses **Railpack** — Railway's native builder.
> Railway runs `npm install` + `npm run build` (TypeScript compile only, ~30 seconds).
> The React Dashboard (`dist/dashboard/`) is pre-built by GitHub Actions and
> committed to the repo — no slow dashboard build runs on Railway.

---

## Part 2 — Add PostgreSQL

1. In your Railway project, click **"+ New"** (top right)
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway provisions a PostgreSQL instance automatically
4. Click the PostgreSQL service → **"Variables"** tab — note these auto-generated variables:

```
PGDATABASE    PGHOST    PGPASSWORD    PGPORT    PGUSER    DATABASE_URL
```

> You will reference these using Railway reference variable syntax
> (`${{Postgres.VARIABLE_NAME}}`) in the next step.

---

## Part 3 — Configure the Server Service Variables

1. Click your **Vendure server service** → **"Variables"** tab
2. Add each variable below using **"+ New Variable"**

### Required variables

```env
# ── Database ─────────────────────────────────────────────
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public

# ── Auth ─────────────────────────────────────────────────
COOKIE_SECRET=<random characters — keep secret>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<strong password — keep secret>

# ── App ──────────────────────────────────────────────────
APP_ENV=production
RUN_JOB_QUEUE_FROM_SERVER=true
```

> `${{Postgres.VARIABLE_NAME}}` is Railway's reference variable syntax.
> Railway resolves it to the real value from the PostgreSQL service at runtime.

### Email variables (optional but recommended)

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM="My Store" <noreply@yourdomain.com>
```

> Without these, emails (order confirmations, password resets) are silently discarded.
> Any SMTP provider works (Resend, Postmark, Mailgun, SendGrid, etc.).

3. Click **"Deploy"** to redeploy with the new variables.

---

## Part 4 — Add Asset Storage

Choose **one** of the following options for storing uploaded product images and files.

### Option A — Railway Volume (simple, good for demos)

1. In your Railway project, click **"+ New"** → **"Volume"**
2. Attach it to the **server service**
3. Set mount path to `/vendure-assets`
4. Add this variable to the server service:

```env
ASSET_UPLOAD_DIR=/vendure-assets
```

Assets persist across redeploys on the volume.

---

### Option B — MinIO on Railway (recommended for production)

MinIO is an open-source, S3-compatible object storage server.

**Step 1 — Add the MinIO service:**

1. Click **"+ New"** → **"Docker Image"**
2. Image: `minio/minio`
3. Start command: `server /data --console-address ":9001"`
4. Add a Volume to the MinIO service, mounted at `/data`
5. Add these variables to the **MinIO service**:
   ```env
   MINIO_ROOT_USER=minioadmin
   MINIO_ROOT_PASSWORD=<strong password>
   ```
6. Generate a public domain for MinIO (port 9001) to access the console
7. Open the MinIO console → create a bucket named **`vendure-assets`**
8. Set the bucket to **public** (read access) so product images are accessible

**Step 2 — Connect MinIO to the Vendure server:**

Add these variables to the **server service**:

```env
ASSET_UPLOAD_DIR=                                            # leave blank
MINIO_ENDPOINT=http://${{minio.RAILWAY_PRIVATE_DOMAIN}}:9000
MINIO_ACCESS_KEY=${{minio.MINIO_ROOT_USER}}
MINIO_SECRET_KEY=${{minio.MINIO_ROOT_PASSWORD}}
```

> Replace `minio` in `${{minio.VARIABLE_NAME}}` with whatever your MinIO service
> is named in Railway.

---

### Option C — AWS S3 or Cloudflare R2

```env
ASSET_UPLOAD_DIR=                          # leave blank
MINIO_ENDPOINT=https://your-s3-or-r2-endpoint
MINIO_ACCESS_KEY=your-access-key-id
MINIO_SECRET_KEY=your-secret-access-key
```

> Both Cloudflare R2 and AWS S3 are compatible with the S3 storage strategy
> already configured in this template.

---

## Part 5 — Set a Public Domain for the Backend

1. On the project canvas, hover over the **server service card**
2. Click the **three-dot menu (⋮)** → **"Generate Domain"**  
   _(Or: click the service → **"Settings"** → **"Networking"** → **"Generate Domain"**)_

Railway assigns a URL like `vendure-xxxxx.up.railway.app`

3. Visit `https://your-domain.up.railway.app` — you will be redirected to `/dashboard`
4. Log in with `superadmin` / your chosen password

> On **first startup**, the server detects an empty database and automatically
> populates it with sample products and data. This takes **2–3 minutes**.
> Watch the **Logs** tab and wait for `Vendure server listening on port` before logging in.

---

## Part 6 — Add the Next.js Storefront (Optional)

The storefront is included in this repository as a **git submodule** at `storefront/`
(sourced from [vendurehq/nextjs-starter-vendure](https://github.com/vendurehq/nextjs-starter-vendure)).
It is deployed as a **second Railway service** from the same repo using `storefront/` as its root directory.

### 6a — Add the Storefront Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Select the **same repository** as the Vendure backend
3. Railway creates a new service — rename it **"Storefront"**
4. Click the Storefront service → **"Settings"** tab
5. Find **"Root Directory"** and set it to:
   ```
   storefront
   ```
   Railway will now build and deploy only the `storefront/` subdirectory.

### 6b — Configure Storefront Variables

Click the **Storefront service** → **"Variables"** tab and add:

```env
# Required — Vendure Shop API (replace 'server' with your backend service name in Railway)
VENDURE_SHOP_API_URL=https://${{server.RAILWAY_PUBLIC_DOMAIN}}/shop-api

# Required — random secret for cache invalidation (/api/revalidate endpoint)
REVALIDATION_SECRET=<generate a random string>

# Set after generating the storefront domain in step 6d
NEXT_PUBLIC_SITE_URL=https://<storefront-domain>.up.railway.app
```

### 6c — Allow the Storefront in Backend CORS

The Vendure backend must allow cross-origin requests from the storefront.

Click the **server service** → **"Variables"** tab and add:

```env
STOREFRONT_URL=https://<storefront-domain>.up.railway.app
```

> Supports multiple origins separated by commas:
> `STOREFRONT_URL=https://storefront.up.railway.app,http://localhost:3001`

**Redeploy the server service** after adding this variable.

> If `STOREFRONT_URL` is not set, the backend allows all origins (`*`) by default —
> which is fine for development but should be locked down for production.

### 6d — Generate a Domain for the Storefront

Follow the same steps as Part 5 to generate a public domain for the Storefront service.

Then update both services with the generated domain and redeploy:
- **Storefront**: set `NEXT_PUBLIC_SITE_URL=https://<storefront-domain>.up.railway.app`
- **Server**: set `STOREFRONT_URL=https://<storefront-domain>.up.railway.app`

### 6e — Also set the storefront URL in email templates

Update the **server service** variables so password-reset and verify emails link to your storefront:

```env
STOREFRONT_URL=https://<storefront-domain>.up.railway.app
```

> `STOREFRONT_URL` is used for both CORS and email template links — one variable covers both.

---

## Part 7 — Add the Worker Service (Optional, Recommended for Production)

The server handles the job queue itself when `RUN_JOB_QUEUE_FROM_SERVER=true`.
For production workloads, run it in a dedicated worker service instead.

1. Click **"+ New"** → **"GitHub Repo"**
2. Select the **same repository** — Railway creates another service
3. Rename it **"Worker"**
4. Click the Worker service → **"Settings"** tab
5. Set **"Start Command"** to:
   ```
   node ./dist/index-worker.js
   ```
6. Go to **"Networking"** → disable **"Public Networking"** (worker needs no public URL)
7. Click the Worker service → **"Variables"** tab and add:

```env
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public
COOKIE_SECRET=<same value as server>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<same value as server>
APP_ENV=production
RUN_JOB_QUEUE_FROM_SERVER=false
```

8. Also update the **server service**: change `RUN_JOB_QUEUE_FROM_SERVER` to `false`
9. Redeploy both the server and worker services

---

## Part 8 — Troubleshooting

### Build logs
Click the service → **"Deployments"** tab → latest deployment → **"View Logs"**

| Log message | Meaning |
|---|---|
| `tsc` errors | TypeScript compile issue — check `src/` files |
| `vite build` errors | Dashboard build issue — check `vite.config.mts` |
| `npm ERR!` | Dependency install failure |
| `Cannot find module` | Missing dependency or wrong root directory |

### Runtime logs
Click the service → **"Logs"** tab (live)

| Log message | Meaning |
|---|---|
| `No Vendure tables found in DB. Populating database...` | First run — normal, wait 2–3 min |
| `Vendure server listening on port` | Server started successfully ✓ |
| `Error: connect ECONNREFUSED` | DB vars not set or PostgreSQL not linked |
| `password authentication failed` | Wrong `DB_PASSWORD` value |
| `relation does not exist` | Migrations haven't run yet — wait or check logs |
| `ENOENT: no such file or directory` on assets | `ASSET_UPLOAD_DIR` not set or volume not mounted |
| Storefront shows "Failed to fetch" | `VENDURE_SHOP_API_URL` is wrong or CORS not configured |

---

## Part 9 — Publish as a Public Railway Template (Optional)

Once your deployment is working:

1. Go to [railway.com/account/templates](https://railway.com/account/templates)
2. Click **"Create Template"**
3. Select your deployed project
4. Fill in the template details:
   - **Name:** `Vendure v3.5.5 + Next.js Storefront`
   - **Description:** `Full-stack Vendure e-commerce — backend API, React Dashboard, Next.js storefront, PostgreSQL`
   - **Services:** select Server + PostgreSQL + Storefront (+ Worker if added)
5. Mark the following as **required variables** (users must set on deploy):
   - `COOKIE_SECRET`
   - `SUPERADMIN_PASSWORD`
   - `REVALIDATION_SECRET`
6. Click **"Publish"** — Railway generates a public template URL
7. Update the deploy button in `README.md`:

```markdown
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YOUR_TEMPLATE_ID)
```

---

## Service Summary

| Service | Root dir | Start command | Public URL | Required |
|---|---|---|---|---|
| **Server** | `/` | `node ./dist/index.js` | Yes — `/dashboard`, `/admin-api`, `/shop-api`, `/assets` | Yes |
| **PostgreSQL** | — | managed by Railway | No | Yes |
| **Storefront** | `storefront/` | `npm start` | Yes — `/` | Optional |
| **Worker** | `/` | `node ./dist/index-worker.js` | No | Optional |
| **MinIO** | — | `server /data --console-address ":9001"` | Optional (console on :9001) | Optional |

---

## All Environment Variables Reference

### Server service

```env
# ── Database ──────────────────────────────────────────────
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public

# ── Auth ──────────────────────────────────────────────────
COOKIE_SECRET=<random string — keep secret>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<strong password — keep secret>

# ── App ───────────────────────────────────────────────────
APP_ENV=production
PORT=3000                              # set automatically by Railway — do not override

# ── Job Queue ─────────────────────────────────────────────
# true  = server runs the job queue (no separate worker needed)
# false = requires a separate worker service (see Part 7)
RUN_JOB_QUEUE_FROM_SERVER=true

# ── Storefront (CORS + email links) ───────────────────────
STOREFRONT_URL=https://<storefront-domain>.up.railway.app

# ── Email (SMTP) ──────────────────────────────────────────
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM="My Store" <noreply@yourdomain.com>

# ── Asset Storage — choose ONE ────────────────────────────
# Option A: Railway Volume
ASSET_UPLOAD_DIR=/vendure-assets

# Option B/C: MinIO / S3 / Cloudflare R2 (leave ASSET_UPLOAD_DIR blank)
ASSET_UPLOAD_DIR=
MINIO_ENDPOINT=https://your-minio-or-s3-endpoint
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
```

### Storefront service

```env
# Required
VENDURE_SHOP_API_URL=https://${{server.RAILWAY_PUBLIC_DOMAIN}}/shop-api
REVALIDATION_SECRET=<same random string as set on server or a new one>

# Set after generating a domain
NEXT_PUBLIC_SITE_URL=https://<storefront-domain>.up.railway.app

# Optional
VENDURE_CHANNEL_TOKEN=__default_channel__
NEXT_PUBLIC_SITE_NAME=My Vendure Store
```

### Worker service

```env
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public
COOKIE_SECRET=<same value as server>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<same value as server>
APP_ENV=production
RUN_JOB_QUEUE_FROM_SERVER=false
```

### MinIO service (if used)

```env
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=<strong password>
```

---

## Available Endpoints After Deploy

### Backend (`https://<backend-domain>.up.railway.app`)

| URL | Description |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | React Admin Dashboard |
| `/admin-api` | Admin GraphQL API |
| `/shop-api` | Storefront GraphQL API |
| `/assets` | Uploaded images and files |

### Storefront (`https://<storefront-domain>.up.railway.app`)

| URL | Description |
|---|---|
| `/` | Homepage — featured products |
| `/search` | Full-text product search with faceted filters |
| `/collections/:slug` | Browse by collection |
| `/products/:slug` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/account` | Customer account (orders, addresses, profile) |
| `/sign-in` | Login / register |
