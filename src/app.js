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
  let msg = `
  Hello. All the action is at '/api/profiles' !
  <br></br>

  Supported methods and endpoints:
  <br></br> - GET '/api/profiles' | get all profiles
  <br></br> - POST '/api/profiles' | add a profile
  <br></br> - GET '/api/profiles/:id' | get a specific profile by id
  <br></br> - PATCH '/api/profiles/:id' | update a specific profile by id
  <br></br> - DELETE '/api/profiles/:id' | delete a specific profile by id

  <br></br>
  Req & Res:
  <br></br> - Include 'Content-Type: application/json' in header of all requests
  <br></br> - Responses are in JSON format
  `;

  res.send(msg);
});

app.use(function errorHandler(error, req, res, next) {
  let response;

  response = { error: { message: 'server error' } };
  console.error(error);

  res.status(500).json(response);
});

module.exports = app;
