/**
 * Santapris Academy – Backend Server
 * Serves the frontend and provides a shared REST API so all staff
 * can access the same data from any browser / device.
 */

const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const compression = require('compression');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Data directory ────────────────────────────────────────────────────────────
const DATA_DIR  = path.join(__dirname, 'data');
const DB_FILE   = path.join(DATA_DIR, 'db.json');
const USR_FILE  = path.join(DATA_DIR, 'users.json');

// Ensure data directory and default files exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function ensureFile(filePath, defaultContent) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2), 'utf8');
  }
}

const DEFAULT_DB = {
  students: [],
  teachers: [],
  exams: [],
  booklist: [],
  meanScores: [],
  supervisionLists: [],
  counters: { adm: 1, tch: 1 }
};

ensureFile(DB_FILE,  DEFAULT_DB);
ensureFile(USR_FILE, {});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(compression());                              // gzip responses
app.use(express.json({ limit: '50mb' }));            // parse JSON bodies (large — has logo)
app.use(express.static(path.join(__dirname, 'public'))); // serve index.html + assets

// ── API: School Database ──────────────────────────────────────────────────────

/** GET /api/db  — return the shared school database */
app.get('/api/db', (req, res) => {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error('GET /api/db error:', err.message);
    res.json(DEFAULT_DB);
  }
});

/** POST /api/db  — replace the shared school database (full save) */
app.post('/api/db', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    // Atomic write: write to temp then rename
    const tmp = DB_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data), 'utf8');
    fs.renameSync(tmp, DB_FILE);
    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/db error:', err.message);
    res.status(500).json({ error: 'Failed to save database' });
  }
});

// ── API: User Accounts (shared across all browsers) ──────────────────────────

/** GET /api/users  — return user account map */
app.get('/api/users', (req, res) => {
  try {
    const raw = fs.readFileSync(USR_FILE, 'utf8');
    res.json(JSON.parse(raw));
  } catch (err) {
    res.json({});
  }
});

/** POST /api/users  — save user account map */
app.post('/api/users', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    const tmp = USR_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data), 'utf8');
    fs.renameSync(tmp, USR_FILE);
    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/users error:', err.message);
    res.status(500).json({ error: 'Failed to save users' });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Fallback: serve index.html for any unknown route ─────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏫  Santapris Academy server running on port ${PORT}`);
  console.log(`    Local:   http://localhost:${PORT}`);
  console.log(`    Data:    ${DATA_DIR}\n`);
});
