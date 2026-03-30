# Railway Deployment Guide — Vendure v3.5.5

Complete step-by-step instructions to deploy this Vendure template on Railway,
including server, worker, PostgreSQL, and publishing as a public template.

---

## Prerequisites

- GitHub account with this repo pushed (public or private)
- Railway account — [railway.com](https://railway.com)

```bash
# Push the repo to GitHub first
git add .
git commit -m "Vendure 3.5.5 Railway template"
git push origin master
```

---

## Part 1 — Create a New Railway Project

1. Go to [railway.com](https://railway.com) → click **New Project**
2. Choose **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub account if prompted
4. Select your repository → click **Deploy Now**

> **Note:** This template uses **Railpack** — Railway's native builder.
> Railway runs `npm install` + `npm run build` (`tsc` only, ~30 seconds).
> The React Dashboard (`dist/dashboard/`) is pre-built by GitHub Actions
> and committed to the repo — no slow dashboard build runs on Railway.

---

## Part 2 — Add PostgreSQL

1. In your Railway project, click **"+ New"** (top right)
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway provisions a PostgreSQL instance automatically
4. Click the PostgreSQL service → **"Variables"** tab to see the auto-generated variables:

```
PGDATABASE
PGHOST
PGPASSWORD
PGPORT
PGUSER
DATABASE_URL
```

> You will reference these using Railway reference variable syntax
> (`${{Postgres.VARIABLE_NAME}}`) in the next step.

---

## Part 3 — Configure the Server Service Variables

1. Click your **Vendure server service** (the GitHub service) → **"Variables"** tab
2. Click **"+ New Variable"** for each variable below:

### Required variables

```env
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public
COOKIE_SECRET=<add some random characters>         # required — keep secret
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<create some strong password>  # required — keep secret
APP_ENV=production
RUN_JOB_QUEUE_FROM_SERVER=true
```

> **`${{Postgres.VARIABLE_NAME}}`** is Railway's reference variable syntax.
> Railway automatically resolves it to the real value from the linked
> PostgreSQL service at runtime. Type it exactly as shown above.

### Asset storage — choose ONE option

#### Option A — Railway Volume (simple, good for demos)

1. In your Railway project, click **"+ New"** → **"Volume"**
2. Attach it to the server service
3. Set mount path to `/vendure-assets`
4. Add this variable to the server service:

```env
ASSET_UPLOAD_DIR=/vendure-assets
```

Assets are stored on the volume and persist across redeploys.

#### Option B — MinIO (self-hosted S3-compatible, recommended for production)

MinIO is an open-source S3-compatible object storage server. You can run it
as a Railway service or use any hosted MinIO/S3 instance.

Add these variables to the server service:

```env
ASSET_UPLOAD_DIR=                          # leave blank when using MinIO
MINIO_ENDPOINT=https://your-minio-host     # e.g. https://minio.example.com
MINIO_ACCESS_KEY=your-minio-access-key
MINIO_SECRET_KEY=your-minio-secret-key
```

**MinIO on Railway:**
1. Click **"+ New"** → **"Docker Image"**
2. Use image: `minio/minio`
3. Set start command: `server /data --console-address ":9001"`
4. Add environment variables to the MinIO service:
   ```env
   MINIO_ROOT_USER=minioadmin
   MINIO_ROOT_PASSWORD=<strong-password>
   ```
5. Add a Volume to MinIO service, mount at `/data`
6. Create a bucket named `vendure-assets` via the MinIO console (port 9001)
7. Reference MinIO variables in the server service:
   ```env
   MINIO_ENDPOINT=http://${{minio.RAILWAY_PRIVATE_DOMAIN}}:9000
   MINIO_ACCESS_KEY=${{minio.MINIO_ROOT_USER}}
   MINIO_SECRET_KEY=${{minio.MINIO_ROOT_PASSWORD}}
   ```

#### Option C — AWS S3 / Cloudflare R2

```env
ASSET_UPLOAD_DIR=                          # leave blank when using S3/R2
MINIO_ENDPOINT=https://your-r2-or-s3-endpoint
MINIO_ACCESS_KEY=your-access-key-id
MINIO_SECRET_KEY=your-secret-access-key
```

> Cloudflare R2 and AWS S3 both work with the S3-compatible storage strategy
> already configured in this template.

3. Click **"Deploy"** to redeploy with the new variables.

---

## Part 4 — Set a Public Domain

Railway's UI has two ways to generate a public domain depending on the version you see:

**Option A — From the service overview (newer UI)**
1. Click on your **Vendure server service** card
2. Look for the **"+ Add"** button or a **globe / network icon** near the top of the service panel
3. Click it and select **"Generate Domain"** or **"Custom Domain"**

**Option B — From Settings (older UI)**
1. Click the server service → **"Settings"** tab
2. Scroll down to the **"Networking"** or **"Public Networking"** section
3. Click **"Generate Domain"**

**Option C — From the service card directly (current UI)**
1. On the project canvas, hover over the **server service card**
2. Click the **three-dot menu (⋮)** in the top-right corner of the card
3. Select **"Generate Domain"**

Once generated, Railway assigns a URL like `vendure-xxxxx.up.railway.app`

4. Visit `https://your-domain.up.railway.app` — you will be redirected to `/dashboard`
5. Log in with `superadmin` / your chosen password

> On **first startup**, the server detects an empty database and automatically
> populates it with sample products and data. This takes **2–3 minutes**.
> Wait for the logs to show `Vendure server listening on port` before logging in.

---

## Part 5 — Add the Worker Service (Recommended for Production)

Running the job queue in a dedicated worker service is recommended for
production workloads. Skip this step for simple/demo deployments
(the server handles the job queue when `RUN_JOB_QUEUE_FROM_SERVER=true`).

1. In your Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select the **same repository** — Railway creates a second service
3. Click the new worker service → **"Settings"** tab
4. Find **"Start Command"** and set it to:
   ```
   node ./dist/index-worker.js
   ```
5. Click the worker service → **"Variables"** tab and add:

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

6. Also update the **server service**: change `RUN_JOB_QUEUE_FROM_SERVER` to `false`
7. Go to the worker service → **"Settings"** → **"Networking"** → disable **"Public Networking"**
   (the worker does not need a public URL)

---

## Part 6 — Check Logs if Something Fails

### Build logs
Click the service → **"Deployments"** tab → click the latest deployment → **"View Logs"**

| Log message | Meaning |
|---|---|
| `tsc` errors | TypeScript compile issue — check `src/` files |
| `vite build` errors | Dashboard build issue — check `vite.config.mts` |
| `npm ERR!` | Dependency install failure |

### Runtime logs
Click the service → **"Logs"** tab (live logs)

| Log message | Meaning |
|---|---|
| `No Vendure tables found in DB. Populating database...` | First run — normal, wait 2–3 min |
| `Vendure server listening on port` | Server started successfully ✓ |
| `Error: connect ECONNREFUSED` | DB vars not set or PostgreSQL not linked |
| `password authentication failed` | Wrong `DB_PASSWORD` value |
| `relation does not exist` | Migrations haven't run yet |
| `ENOENT: no such file or directory` on assets | `ASSET_UPLOAD_DIR` not set or volume not mounted |

---

## Part 7 — Publish as a Public Railway Template (Optional)

Once your deployment is working:

1. Go to [railway.com/account/templates](https://railway.com/account/templates)
2. Click **"Create Template"**
3. Select your deployed project
4. Fill in the template details:
   - **Name:** `Vendure v3.5.5`
   - **Description:** `Vendure e-commerce backend with React Dashboard, PostgreSQL, and optional worker service`
   - **Services:** select server + PostgreSQL (+ worker if added)
5. Mark the following as **required variables** (users must set these on deploy):
   - `COOKIE_SECRET`
   - `SUPERADMIN_PASSWORD`
6. Click **"Publish"** — Railway generates a public template URL
7. Update the deploy button in `README.md`:

```markdown
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YOUR_TEMPLATE_ID)
```

---

## Service Summary

| Service | Start command | Public URL |
|---|---|---|
| Server | `node ./dist/index.js` | Yes — `/dashboard`, `/admin-api`, `/shop-api` |
| Worker | `node ./dist/index-worker.js` | No |
| PostgreSQL | managed by Railway | No |
| MinIO (optional) | `server /data --console-address ":9001"` | Optional (console on port 9001) |

## Available Endpoints (after deploy)

| URL | Description |
|---|---|
| `/dashboard` | React Dashboard (admin UI) |
| `/admin-api` | Admin GraphQL API |
| `/shop-api` | Storefront GraphQL API |
| `/assets` | Asset server |
| `/mailbox` | Dev email inbox (dev mode only) |

---

## All Environment Variables Reference

### Server service

```env
# ── Database (Railway reference variables) ───────────────
DB_NAME=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_SCHEMA=public

# ── Auth ─────────────────────────────────────────────────
COOKIE_SECRET=<add some random characters>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<create some strong password>

# ── App ──────────────────────────────────────────────────
APP_ENV=production
PORT=3000                           # set automatically by Railway

# ── Job Queue ─────────────────────────────────────────────
# true  = server runs job queue (single service, simpler)
# false = separate worker service runs job queue
RUN_JOB_QUEUE_FROM_SERVER=true

# ── Asset Storage ─────────────────────────────────────────
# Option A: Railway Volume
ASSET_UPLOAD_DIR=/vendure-assets    # must match volume mount path

# Option B: MinIO / S3 / Cloudflare R2
# When MINIO_ENDPOINT is set, ASSET_UPLOAD_DIR is ignored
ASSET_UPLOAD_DIR=                   # leave blank
MINIO_ENDPOINT=https://your-minio-or-s3-endpoint
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
```

### Worker service (if used)

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
