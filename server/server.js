const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg'); // driver Postgres

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve i file statici di React
app.use(express.static(path.join(__dirname, '../client/dist'))); // se usi CRA: '../client/build'

// Connessione al DB Postgres su Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render fornisce DATABASE_URL come variabile d'ambiente
  ssl: {
    rejectUnauthorized: false // necessario su Render
  }
});

// Test connessione DB
pool.connect((err, client, release) => {
  if (err) {
    console.error('Errore connessione DB:', err.stack);
  } else {
    console.log('DB Postgres connesso correttamente.');
    release();
  }
});

// API per ottenere i parcheggi
app.get('/parking', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parcheggi');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero dei dati' });
  }
});

// Catch-all per servire React
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // se CRA: '../client/build'
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
