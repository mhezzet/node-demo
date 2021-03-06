const express = require('express');
const app = express();
const winston = require('winston');

//startup
require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`server is listening @port:${port}`);
});

module.exports = server;
