const config = require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const requestLogging = require('./middleware/requestLogs');

// importing routes
const homeRoute = require('./routes/home');

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/', requestLogging, homeRoute);

startServer = http.createServer(app).listen(config.port, () => {
  console.log('Server started at port: ', config.port);
});
