'use strict'

var appRoot = global.server.appRoot;
var winston = require('winston');
var ENV = global.server.env

// define the custom settings for each transport (file, console)
var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/request.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: ENV === 'development' ? 'info' : ENV === 'test' ? 'info' : 'alert',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  
  // instantiate a new Winston Logger with the settings defined above
  var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  
  // create a stream object with a 'write' function that will be used by `morgan`
  // use the 'info' log level so the output will be picked up by both transports (file and console)
  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };
  
  module.exports = logger;
  