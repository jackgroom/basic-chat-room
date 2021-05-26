const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(express.json());

// const db = monk(process.env.MONGO_URI || 'localhost/chatroom');
// const chatlog = db.get('chatlog');

// ------------------------------------------------------------------
// ROUTES

// READ ALL
app.get('/', (req, res, next) => {
  res.json({
    message: 'HELLO READ ALL',
  });
});

// READ ONE
app.get('/:id', (req, res, next) => {
  res.json({
    message: 'HELLO READ ONE',
  });
});

// CREATE ONE

app.post('/', (req, res, next) => {
  res.json({
    message: 'HELLO CREATE ONE',
  });
});

// UPDATE ONE

app.put('/:id', (req, res, next) => {
  res.json({
    message: 'HELLO UPDATE ONE',
  });
});

// DELETE ONE

app.delete('/:id', (req, res, next) => {
  res.json({
    message: 'HELLO DELETE ONE',
  });
});

// ------------------------------------------------------------------
// LISTEN

app.listen(5000, () => {
  console.log('Listening on port http://localhost:5000');
});
