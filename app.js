const dotenv = require('dotenv').config();

const config = require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const redis = require('./lib/redis');

const logger = require('./lib/logger');

// importing routes
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan(':date[iso] :method :url :status - :response-time ms'));

app.use('/', homeRoute);
app.use('/api/user/', userRoute);

mongoose.connect(config.dbURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (err) {
      logger.error("DB Error: ", err);
      process.exit(1);
  }
  
  logger.info('MongoDB Connected');
  startServer = http.createServer(app).listen(config.port, () => {
    logger.info('Server started at port: ', config.port);
  });
});

