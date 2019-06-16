const config = require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');

const logger = require('./lib/logger');

// importing routes
const homeRoute = require('./routes/home');

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan(':date[iso] :method :url :status - :response-time ms'));

app.use('/', homeRoute);

startServer = http.createServer(app).listen(config.port, () => {
  logger.info('Server started at port: ', config.port);
});
