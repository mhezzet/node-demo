const winston = require('winston');
require('express-async-errors');

module.exports = function() {
  winston.configure({
    level: 'info',
    exitOnError: false,
    format: winston.format.json(),

    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'log.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ]
  });

  process.on('unhandledRejection', ex => {
    throw ex;
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    );
  }
};
