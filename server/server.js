const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve i file statici di React
app.use(express.static(path.join(__dirname, '../client/dist'))); // se usi CRA: '../client/build'

// Connessione al DB SQLite
const db = new sqlite3.Database('./parking.db', (err) => {
  if (err) {
    console.error('Errore apertura DB:', err.message);
  } else {
    console.log('DB connesso correttamente.');
  }
});

// API per ottenere i parcheggi
app.get('/parking', (req, res) => {
  db.all('SELECT * FROM parcheggi', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore nel recupero dei dati' });
    } else {
      res.json(rows);
    }
  });
});

// Catch-all per servire React
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // se CRA: '../client/build'
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
