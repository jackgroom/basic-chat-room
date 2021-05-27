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

const db = monk('localhost/chatroom');
const chatlog = db.get('chatlog');

db.then(() => {
  console.log('Connected to database');
});

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
app.get('/', (req, res, next) => {
  try {
    chatlog.find().then((log) => {
      res.json(log);
    });
  } catch (error) {
    next(error);
  }
});

// READ ONE
app.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    chatlog
      .findOne({
        _id: id,
      })
      .then((item) => {
        res.json(item);
      });
  } catch (error) {
    next(error);
  }
});

// CREATE ONE

app.post('/', (req, res, next) => {
  try {
    const value = schema.validate(req.body);
    chatlog.insert(value).then(() => {
      res.json(value);
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE

app.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const value = schema.validate(req.body);
    chatlog
      .findOne({
        _id: id,
      })
      .then((item) => {
        chatlog.update(
          {
            _id: id,
          },
          value
        );
      })
      .catch(() => {
        next('fuck off');
      });
  } catch (error) {
    next(error);
  }
});

// DELETE ONE

app.delete('/:id', (req, res, next) => {
  res.json({
    message: 'HELLO DELETE ONE',
  });
});

// ------------------------------------------------------------------
// Error handler

app.use((error, req, res, next) => {
  res.status(error.status ? error.status : 500);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

// ------------------------------------------------------------------
// Listen

app.listen(5000, () => {
  console.log('Listening on port http://localhost:5000');
});
