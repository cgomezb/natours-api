const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);

module.exports = app;
