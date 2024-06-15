const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/workouts.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    duration INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS weights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exercise TEXT NOT NULL,
    warmupWeight INTEGER NOT NULL,
    peakWeight INTEGER NOT NULL,
    sets INTEGER NOT NULL
  )`);
});

module.exports = db;
