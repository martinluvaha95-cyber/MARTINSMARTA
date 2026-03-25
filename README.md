# 🏫 Santapris Academy — School Management System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-≥16.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Single%20File%20App-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A full-featured, self-hosted school management system for Santapris Academy.**  
Manage students, teachers, exams, results, PDF report cards, Excel marksheets, supervision lists and more — accessible by all staff from any browser in real time.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [Deployment](#-deployment) · [API Reference](#-api-reference) · [Project Structure](#-project-structure)

---

![Dashboard Preview](https://via.placeholder.com/900x480/1a2e1f/4ade80?text=Santapris+Academy+Dashboard)

</div>

---

## ✨ Features

### 👨‍🎓 Student Management
- Register, edit, and delete students across **16 classes** (Grades 4–9, multiple streams per grade)
- Auto-generate Admission Numbers (`SNT001`, `SNT002`, …)
- Store NEMIS number, Assessment Number, parent/guardian contact, gender
- Bulk student import via **Excel upload** (`.xlsx`)
- Full-text search and grade-based filtering

### 📝 Exam & Results
- Enter marks per subject for **Grades 4–6** (8 subjects) and **Grades 7–9** (9 subjects including Pre-Technical Studies)
- English and Kiswahili sub-score support (Grammar/Composition, Lugha/Insha)
- CBC rubric grading system (EE1 → BE2) auto-calculated from raw marks
- Per-class and cross-stream **overall rank** computation
- Download **Excel score-entry templates** pre-populated with student lists

### 📊 Reports & Analytics
- **PDF Report Cards** per student (jsPDF, fully inlined — no CDN)
- **PDF Marksheets** per class and per exam
- Subject-level analysis: mean scores, grade distributions, teacher performance
- Dashboard with live stats: enrolment by stream, top 5 performers, subject averages
- Export any results table to **PDF or Excel**

### 👩‍🏫 Teacher Management
- Register teachers with subject–class assignment mapping
- Class teacher designation
- Book Issue tracking (book title, date, quantity per teacher)
- Collective book report PDF across all teachers

### 🗓️ Supervision Allocation
- Auto-generate exam supervision schedules from registered teachers
- Avoid repeating teachers across consecutive sessions
- Save, view, and delete past supervision lists
- Print-ready PDF supervision timetable

### 🔐 Authentication
- Register / Login with username + password
- Password rules enforced (min 8 chars, uppercase, number, special character)
- Server-side user storage — accounts work from **any browser on any device**
- Session persistence via `localStorage`
- Default admin account pre-seeded on first run

### 🌐 Multi-Device / Multi-Staff
- All data stored on the **server** (plain JSON files)
- Every browser **pulls latest data on load and on login**
- Every save is **pushed to the server within 500 ms** — other staff see changes immediately
- Works offline (falls back to local cache if server is temporarily unreachable)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js 16+, Express 4 |
| **Frontend** | Vanilla JavaScript (ES2020), HTML5, CSS3 |
| **PDF Generation** | jsPDF 2.5.1 (fully inlined, no CDN) |
| **Excel I/O** | SheetJS / xlsx 0.18.5 (fully inlined, no CDN) |
| **Data Storage** | JSON flat files (`data/db.json`, `data/users.json`) |
| **Compression** | Express `compression` middleware (gzip) |
| **Deployment** | Any Node.js host (Railway, Render, VPS, Glitch…) |

> **No database server required.** All school data lives in two JSON files you can back up with a single copy.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) version 16 or higher
- npm (bundled with Node.js)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/santapris-academy.git
cd santapris-academy
npm install
```

### 2. Start the Server

```bash
node server.js
```

You should see:

```
🏫  Santapris Academy server running on port 3000
    Local:   http://localhost:3000
    Data:    /your/path/santapris-academy/data
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

### 4. Default Login

| Field | Value |
|---|---|
| Username | `Martinsmarta` |
| Password | `Luvahama1995!` |

> ⚠️ **Change the default password immediately** after your first login.

---

## 📁 Project Structure

```
santapris-academy/
├── server.js              # Express backend — serves the app & REST API
├── package.json           # Project metadata & dependencies
├── README.md              # This file
│
├── public/
│   └── index.html         # Complete frontend SPA (all JS/CSS inlined, ~3.8 MB)
│
└── data/                  # Auto-created on first run
    ├── db.json            # All school data (students, teachers, exams…)
    └── users.json         # User accounts (hashed passwords)
```

> The `data/` directory is created automatically when the server first starts. **Back up `data/db.json` regularly** — it contains your entire school database.

---

## 🌍 Deployment

### Option A — Railway.app *(Recommended for beginners)*

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Select your repository — Railway auto-detects Node.js
4. In **Settings → Volumes**, add a volume mounted at `/app/data` *(prevents data loss on restarts)*
5. Your app is live at `yourapp.up.railway.app`

### Option B — Render.com *(Free tier available)*

1. Push to GitHub
2. [render.com](https://render.com) → **New** → **Web Service** → connect repo
3. **Build command:** `npm install`
4. **Start command:** `node server.js`
5. Add a **Persistent Disk** at `/app/data` in the service settings
6. Set env var `PORT=10000` (Render's default port)

> ⚠️ Render's **free tier spins down after 15 min idle**. Use the Starter plan ($7/month) for always-on access.

### Option C — VPS (DigitalOcean / Hetzner / Linode) *(Best for production)*

```bash
# On your VPS (Ubuntu/Debian)
git clone https://github.com/YOUR_USERNAME/santapris-academy.git
cd santapris-academy
npm install

# Install PM2 process manager
npm install -g pm2

# Start app and keep it running across reboots
pm2 start server.js --name santapris
pm2 save
pm2 startup

# (Optional) Nginx reverse proxy
# Proxy http://localhost:3000 to your domain
```

**Nginx config snippet:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then secure with HTTPS using [Certbot](https://certbot.eff.org/):
```bash
sudo certbot --nginx -d yourdomain.com
```

### Option D — Glitch.com *(Instant, no setup)*

1. Go to [glitch.com](https://glitch.com) → **New Project** → **Import from GitHub**
2. Paste your repo URL
3. App is live instantly at `your-project-name.glitch.me`

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

---

## 📡 API Reference

All endpoints are JSON over HTTP.

### `GET /api/health`
Health check.

**Response:**
```json
{ "status": "ok", "time": "2026-03-25T10:00:00.000Z" }
```

---

### `GET /api/db`
Retrieve the full school database.

**Response:** The complete `db` object:
```json
{
  "students": [ ... ],
  "teachers": [ ... ],
  "exams": [ ... ],
  "booklist": [ ... ],
  "meanScores": [ ... ],
  "supervisionLists": [ ... ],
  "counters": { "adm": 42, "tch": 18 }
}
```

---

### `POST /api/db`
Save the full school database (replaces the current state).

**Request body:** Same shape as the `GET /api/db` response.

**Response:**
```json
{ "ok": true }
```

---

### `GET /api/users`
Retrieve all user accounts (passwords are hashed).

**Response:**
```json
{
  "Martinsmarta": {
    "username": "Martinsmarta",
    "passhash": "...",
    "isAdmin": true,
    "createdAt": "2024-01-01"
  }
}
```

---

### `POST /api/users`
Save the full user accounts object.

**Request body:** Same shape as the `GET /api/users` response.

**Response:**
```json
{ "ok": true }
```

---

## 🔧 How Real-Time Sync Works

```
Browser A (Staff 1)               Server                 Browser B (Staff 2)
─────────────────────             ──────                 ─────────────────────
  Page loads
  → GET /api/db          ───────► Reads db.json
  ← receives latest DB   ◄───────
  
  Registers a student
  → POST /api/db         ───────► Writes db.json
  ← { ok: true }         ◄───────
                                                          Page loads / user logs in
                                                          → GET /api/db  ────────►
                                                          ← receives updated DB ◄─
                                                          (sees new student!)
```

- **On page load** → browser fetches latest DB from server before showing the login screen
- **On login** → browser fetches latest DB again (picks up changes made while you were away)
- **On every save** → browser POSTs the updated DB to server (debounced 500 ms to batch rapid changes)
- **Fallback** → if server is unreachable, the app continues using the locally cached copy

---

## 🏫 Grades & Subjects

### Classes
`4N · 4S · 4E · 4W · 5N · 5S · 5E · 5W · 6N · 6S · 7R · 7B · 8R · 8B · 9R · 9B`

### Subjects — Grades 4–6
`Mathematics · English · Kiswahili · Science · Agriculture · Social Studies · CRE · Creative Arts`

### Subjects — Grades 7–9
All of the above **plus** `Pre-Technical Studies (PTE)`

### CBC Rubric Scale

| Score Range | Code | Description |
|---|---|---|
| 90 – 100 | EE1 | Excellent |
| 75 – 89 | EE2 | Very Good |
| 58 – 74 | ME1 | Good |
| 40 – 57 | ME2 | Satisfactory |
| 30 – 39 | AE1 | Can Do Better |
| 21 – 29 | AE2 | Double Your Effort |
| 11 – 20 | BE1 | Put More Effort |
| 0 – 10 | BE2 | Put More Effort |

---

## 🔒 Security Notes

- Passwords are hashed using a deterministic `btoa`-chain function before storage. For a production school environment with sensitive data, consider upgrading to **bcrypt** and adding HTTPS.
- The `/api/db` and `/api/users` endpoints are currently open (no authentication token required). For added security on a public server, consider adding a simple API key or IP whitelist in `server.js`.
- Always run behind **HTTPS** in production (use Certbot or your host's SSL feature).
- **Back up `data/db.json` daily.** A cron job works well:

```bash
# Daily backup at 2 AM
0 2 * * * cp /path/to/data/db.json /path/to/backups/db_$(date +\%F).json
```

---

## 💾 Backup & Restore

### Backup
Simply copy the two data files:
```bash
cp data/db.json    backups/db_$(date +%F).json
cp data/users.json backups/users_$(date +%F).json
```

### Restore
Replace the live files and restart the server:
```bash
cp backups/db_2026-03-25.json data/db.json
node server.js
```

The app also has a built-in **"Backup / Restore"** panel in the UI that lets you download and re-upload the database as a JSON file without any command-line access.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation in the browser
- [SheetJS](https://sheetjs.com/) — Excel read/write in the browser
- [Express.js](https://expressjs.com/) — Fast, minimal Node.js web framework

---

<div align="center">
  Made with ❤️ for Santapris Academy
</div>
