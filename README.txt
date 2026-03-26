╔══════════════════════════════════════════════════════════════╗
║       SANTAPRIS ACADEMY – DEPLOYMENT GUIDE                   ║
╚══════════════════════════════════════════════════════════════╝

WHAT'S INCLUDED
  server.js          ← Node.js backend (Express)
  public/index.html  ← Full frontend app (patched to use server)
  package.json       ← Dependencies (express, compression)
  data/              ← Created automatically; stores db.json & users.json

HOW IT WORKS
  • Every browser that opens the app fetches the latest shared database
    from the server on load and on every login.
  • Every save (student, exam, teacher, etc.) is written to the server
    within 500 ms, so all other staff see fresh data on their next load.
  • Users (accounts) are also server-side — register once, log in from
    any device.

─── LOCAL / TESTING ────────────────────────────────────────────
  1.  npm install
  2.  node server.js
  3.  Open http://localhost:3000

─── PRODUCTION DEPLOYMENT OPTIONS ──────────────────────────────

OPTION A — Render.com (free tier, easiest)
  1. Push this folder to a GitHub repo
  2. Go to https://render.com → New Web Service
  3. Connect your repo
  4. Build command:  npm install
  5. Start command:  node server.js
  6. Add environment variable:  PORT = 10000
  NOTE: Free tier spins down after 15 min idle; use paid tier for
        always-on access. Add a /data persistent disk in settings.

OPTION B — Railway.app (free trial)
  1. Push to GitHub
  2. https://railway.app → New Project → Deploy from GitHub
  3. Railway auto-detects Node.js — no config needed
  4. Add a Volume mounted at /app/data to persist the database

OPTION C — VPS (DigitalOcean, Hetzner, Linode, etc.) — BEST
  1. Upload this folder to your server via SCP/SFTP
  2. npm install
  3. Install PM2:  npm install -g pm2
  4. pm2 start server.js --name santapris
  5. pm2 save && pm2 startup
  6. Set up Nginx reverse proxy to port 3000 (optional but recommended)
  This option keeps data permanently since it runs on YOUR disk.

OPTION D — Glitch.com (free, instant)
  1. Go to https://glitch.com → New Project → Import from GitHub
  2. Or use the Glitch editor to paste files directly
  3. App runs at  yourname.glitch.me

─── IMPORTANT NOTES ─────────────────────────────────────────────
  • The data/ folder holds ALL school data in plain JSON.
    Back it up regularly (just copy data/db.json and data/users.json).
  • Default admin login:  Martinsmarta / Luvahama1995!
    Change this immediately after first login via the app settings.
  • For platforms that reset the filesystem on restart (Render free,
    Heroku free), mount a persistent volume at the /data path.

