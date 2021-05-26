const express = require('express');
const cors = require('cors');
const monk = require('monk');
const joi = require('@hapi/joi');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------
// Database

const db = monk(process.env.MONGO_URI || 'localhost/chatroom');
const chatlog = db.get('chatlog');

// ------------------------------------------------------------------
// Schema

const schema = joi.object({
  username: joi.string().trim().required(),
  message: joi.string().trim().required(),
  created: joi.string().trim().required(),
});

// ------------------------------------------------------------------
// Routes

// READ ALL
app.get('/', async (req, res, next) => {
  try {
    const log = chatlog.find();
    res.json(log);
  } catch (error) {
    next(error);
  }
});

// READ ONE
app.get('/:id', (req, res, next) => {
  res.json({
    message: 'HELLO READ ONE',
  });
});

// CREATE ONE

app.post('/', async (req, res, next) => {
  try {
    const value = await schema.validate(req.body);
    const inserted = await chatlog.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
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
// Listen

app.listen(5000, () => {
  console.log('Listening on port http://localhost:5000');
});
