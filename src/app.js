require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const profilesRouter = require('./profiles/profiles-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const app = express();


app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/profiles', profilesRouter);

app.get('/', (req, res) => {
  res.send(`Hello. All the action is at '/api/profiles !`)
});

app.use(function errorHandler(error, req, res, next) {
  let response;

  response = { error: { message: 'server error' } };
  console.error(error);

  res.status(500).json(response);
});

module.exports = app;
