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

> **Note:** The build takes **5–15 minutes** on first deploy. Railway runs
> `npm run build` inside Docker which compiles TypeScript and builds the
> React Dashboard (the `vite build` step introspects the Vendure config).

---

## Part 2 — Add PostgreSQL

1. In your Railway project, click **"+ New"** (top right)
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway provisions a PostgreSQL instance automatically
4. Click the PostgreSQL service → **"Variables"** tab to see the auto-generated variables:

```
DATABASE_URL
PGHOST
PGPORT
PGDATABASE
PGUSER
PGPASSWORD
```

> Keep this tab open — you will reference `DATABASE_URL` in the next step.

---

## Part 3 — Configure the Server Service Variables

1. Click your **Vendure server service** (the GitHub service) → **"Variables"** tab
2. Add each variable below — click **"+ New Variable"** for each:

### Required variables

| Variable | Value |
|---|---|
| `APP_ENV` | `production` |
| `COOKIE_SECRET` | click **Generate** or paste any random 32-char string |
| `SUPERADMIN_USERNAME` | `superadmin` |
| `SUPERADMIN_PASSWORD` | your chosen admin password |
| `DB_URL` | `${{Postgres.DATABASE_URL}}` |
| `DB_SCHEMA` | `public` |
| `RUN_JOB_QUEUE_FROM_SERVER` | `true` |

> For `DB_URL`, type exactly `${{Postgres.DATABASE_URL}}` — Railway resolves
> this to the real PostgreSQL connection URL at runtime.

### Optional variables (S3 / MinIO asset storage)

| Variable | Value |
|---|---|
| `MINIO_ENDPOINT` | your MinIO or S3 endpoint URL |
| `MINIO_ACCESS_KEY` | your access key |
| `MINIO_SECRET_KEY` | your secret key |

> Leave these blank to use local filesystem storage inside the container.

3. Click **"Deploy"** to redeploy with the new variables.

---

## Part 4 — Set a Public Domain

1. Click the server service → **"Settings"** tab → **"Networking"**
2. Click **"Generate Domain"**
3. Railway assigns a URL like `vendure-xxxxx.up.railway.app`
4. Visit `https://your-domain.up.railway.app` — you will be redirected to `/admin`
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

| Variable | Value |
|---|---|
| `APP_ENV` | `production` |
| `COOKIE_SECRET` | same value as the server |
| `SUPERADMIN_USERNAME` | same value as the server |
| `SUPERADMIN_PASSWORD` | same value as the server |
| `DB_URL` | `${{Postgres.DATABASE_URL}}` |
| `DB_SCHEMA` | `public` |
| `RUN_JOB_QUEUE_FROM_SERVER` | `false` |

6. Also update the **server service**: set `RUN_JOB_QUEUE_FROM_SERVER` to `false`
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
| `Error: connect ECONNREFUSED` | `DB_URL` not set or PostgreSQL not linked |
| `password authentication failed` | Wrong database credentials |
| `relation does not exist` | Migrations haven't run yet |

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
5. Mark the following as **required variables** (users must set these):
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
| Server | `node ./dist/index.js` | Yes — `/admin`, `/admin-api`, `/shop-api` |
| Worker | `node ./dist/index-worker.js` | No |
| PostgreSQL | managed by Railway | No |

## Available Endpoints (after deploy)

| URL | Description |
|---|---|
| `/admin` | React Dashboard (admin UI) |
| `/admin-api` | Admin GraphQL API |
| `/shop-api` | Storefront GraphQL API |
| `/assets` | Asset server |

---

## All Environment Variables Reference

```env
# ── App ──────────────────────────────────────────────────
APP_ENV=production
PORT=3000                          # Set automatically by Railway

# ── Auth ─────────────────────────────────────────────────
COOKIE_SECRET=<random-32-char-string>
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=<strong-password>

# ── Database ─────────────────────────────────────────────
DB_URL=${{Postgres.DATABASE_URL}}  # Railway reference variable
DB_SCHEMA=public

# ── Job Queue ─────────────────────────────────────────────
# true  = server runs job queue (single service, simpler)
# false = separate worker service runs job queue
RUN_JOB_QUEUE_FROM_SERVER=true

# ── Asset Storage (optional — leave blank for local) ──────
ASSET_UPLOAD_DIR=
MINIO_ENDPOINT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
```
