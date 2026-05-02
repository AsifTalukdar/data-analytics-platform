const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const pool = new Pool({ 
  user: process.env.DB_USER || 'postgres', 
  host: process.env.DB_HOST || 'localhost', 
  database: process.env.DB_NAME || 'analytics_db', 
  password: process.env.DB_PASSWORD || '', 
  port: process.env.DB_PORT || 5432 
});
pool.connect((err, client, release) => { if (err) { console.error('DB error:', err.message); } else { console.log('Connected to PostgreSQL!'); release(); } });
const storage = multer.diskStorage({ destination: (req, file, cb) => cb(null, 'uploads/'), filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) });
const upload = multer({ storage });
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.get('/', (req, res) => res.json({ message: 'Backend is running!' }));
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const { filename, originalname, size } = req.file;
    const result = await pool.query('INSERT INTO uploads (filename, originalname, size) VALUES (, , ) RETURNING *', [filename, originalname, size]);
    res.json({ message: 'File uploaded!', upload: result.rows[0] });
  } catch (error) { res.status(500).json({ error: 'Database error' }); }
});
app.get('/api/uploads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM uploads ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: 'Database error' }); }
});
app.post('/api/analyze', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const content = fs.readFileSync(req.file.path, 'utf8');
  const rows = content.trim().split('\n');
  const headers = rows[0].split(',');
  const data = rows.slice(1).map(row => row.split(','));
  const numericSummary = {};
  headers.forEach((header, colIndex) => {
    const values = data.map(row => parseFloat(row[colIndex])).filter(v => !isNaN(v));
    if (values.length > 0) {
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = sum / values.length;
      const sorted = [...values].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      numericSummary[header] = { min: Math.min(...values), max: Math.max(...values), mean: Math.round(mean * 100) / 100, median: Math.round(median * 100) / 100 };
    }
  });
  res.json({ rows: data.length, columns: headers.length, numeric_summary: numericSummary });
});
app.listen(PORT, () => console.log('Backend server running at http://localhost:' + PORT));
