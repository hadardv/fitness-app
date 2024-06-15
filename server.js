const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.send('Fitness Tracker API');
});

// API routes
app.get('/api/goals', (req, res) => {
  db.all('SELECT * FROM goals', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.post('/api/goals', (req, res) => {
  const { goal } = req.body;
  db.run(`INSERT INTO goals (goal) VALUES (?)`, [goal], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/workouts', (req, res) => {
  db.all('SELECT * FROM workouts', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.post('/api/workouts', (req, res) => {
  const { date, type, duration } = req.body;
  db.run(`INSERT INTO workouts (date, type, duration) VALUES (?, ?, ?)`, [date, type, duration], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/weights', (req, res) => {
  db.all('SELECT * FROM weights', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.post('/api/weights', (req, res) => {
  const { exercise, warmupWeight, peakWeight, sets } = req.body;
  db.run(`INSERT INTO weights (exercise, warmupWeight, peakWeight, sets) VALUES (?, ?, ?, ?)`, [exercise, warmupWeight, peakWeight, sets], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.delete('/api/goals/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM goals WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM workouts WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.delete('/api/weights/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM weights WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

// Serve HTML files based on the URL
app.get('/goals', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'goals.html'));
});

app.get('/diet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'diet.html'));
});

app.get('/workout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workout.html'));
});

app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
