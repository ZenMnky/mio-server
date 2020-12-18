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
  app.use((req, res, next) => {
    console.log('req body after morgan')
    console.table(req.body)
    next()
  })
app.use(helmet());
  app.use((req, res, next) => {
    console.log('req body after helmet')
    console.table(req.body)
    next()
  })

app.use(cors());
  app.use((req, res, next) => {
    console.log('req body after cors')
    console.table(req.body)
    next()
})
app.use(express.json());



app.use('/api/profiles', profilesRouter);

app.get('/', (req, res) => {
  res.send(`Hello. All the action is at '/api/profiles !`)
});

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === 'production') {
//     response = { error: { message: 'server error' } };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });

app.use((error, req, res, next) => {
  console.error(error); 
  res.status(500).json({
    error: {message: "Internal server error"}
  })
})

module.exports = app;
