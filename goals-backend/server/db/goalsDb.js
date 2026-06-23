const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
app.use(express.json());

const db = new sqlite3.Database('./goals.db', (err) => {
  if (err) {
    console.error(err.message + " Failed to connect to the goals database.");
  }
  console.log('Connected to the goals database.');
});

app.use(cors());

app.get('/goals', (req, res) => {
  db.all('SELECT * FROM goals', [], (err, rows) => {
    if (err) {
      console.error(err.message + " Failed to retrieve goals from the database.");
      res.status(500).json({ error: 'Failed to retrieve goals from the database.' });
      return;
    }
    res.json(rows);
  });
});

app.get('/goals/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid goal ID. ID must be a number.' });
    return;
  }
  db.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message + " Failed to retrieve the goal from the database.");
      res.status(500).json({ error: 'Failed to retrieve the goal from the database.' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Goal not found.' });
      return;
    }
    res.json(row);
  });
});

app.put('/goals/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid goal ID. ID must be a number.' });
    return;
  }
  const { title, timeframe, is_completed, is_deleted } = req.body;
  if (title === undefined || timeframe === undefined || is_completed === undefined || is_deleted === undefined) {
    res.status(400).json({ error: 'All fields (title, timeframe, is_completed, is_deleted) must be provided for update.' });
    return;
  }
  if (title.trim() === '' || timeframe.trim() === '') {
    res.status(400).json({ error: 'Title and timeframe are required and cannot be empty.' });
    return;
  }
  if (is_completed !== 0 && is_completed !== 1) {
    res.status(400).json({ error: 'is_completed must be either 0 or 1.' });
    return;
  }
  if (is_deleted !== 0 && is_deleted !== 1) {
    res.status(400).json({ error: 'is_deleted must be either 0 or 1.' });
    return;
  }
  if (is_deleted === 1 && is_completed === 0) {
    res.status(400).json({ error: 'A goal cannot be marked as deleted if it is not completed.' });
    return;
  }
  db.run('UPDATE goals SET title = ?, timeframe = ?, is_completed = ?, is_deleted = ? WHERE id = ?', [title, timeframe, is_completed, is_deleted, id], function (err) {
    if (err) {
      console.error(err.message + " Failed to update the goal in the database.");
      res.status(500).json({ error: 'Failed to update the goal in the database.' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Goal not found.' });
      return;
    }
    res.status(200).json({ id: Number(id), title, timeframe, is_completed, is_deleted });
  });
});

app.post('/goals', (req, res) => {
  const { title, timeframe, is_completed, is_deleted } = req.body;
  if (title === undefined || timeframe === undefined || title.trim() === '' || timeframe.trim() === '') {
    res.status(400).json({ error: 'Title and timeframe are required and cannot be empty.' });
    return;
  }
  const completedValue = is_completed ?? 0;
  const deletedValue = is_deleted ?? 0;
  db.run('INSERT INTO goals (title, timeframe, is_completed, is_deleted) VALUES (?, ?, ?, ?)', [title, timeframe, completedValue, deletedValue], function (err) {
    if (err) {
      console.error(err.message + " Failed to create a new goal in the database.");
      res.status(500).json({ error: 'Failed to create a new goal in the database.' });
      return;
    }
    res.status(201).json({
      id: this.lastID,
      title,
      timeframe,
      is_completed: 0,
      is_deleted: 0
    });
  });
});

app.delete('/goals/:id', (req, res) => {
  const id = Number(req.params.id);
;  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid goal ID. ID must be a number.' });
    return;
  }
  db.run('DELETE FROM goals WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message + " Failed to delete the goal from the database.");
      res.status(500).json({ error: 'Failed to delete the goal from the database.' });
      return;
    } if (this.changes === 0) {
      res.status(404).json({ error: 'Goal not found.' });
      return;
    }
    res.status(200).json({ message: 'Goal deleted successfully.' });
  });
});

app.use((err, req, res, next) => {
  // handle malformed JSON here
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Malformed JSON in request body:', err.message);
    return res.status(400).json({ error: 'Malformed JSON in request body.' });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});