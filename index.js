const winston = require("winston");
require("winston-logstash");

let logger, log;

module.exports = function (options) {
  // ensure that we have an options object if one is not supplied
  options = options || {tcpEnabled: false};
  const defaultConsoleOptions = options.consoleOptions || {level: "silly"};
  const defaultMeta = options.meta || {};
  const defaultLogstashOptions = {
    port: 5170,
    host: 'localhost',
    max_connect_retries: 5,
    node_name: 'winston',
    level: "silly"
  };

  // merge the options object so that the caller can overwrite any of the defaults and pass any extra options on.
  const logstashOptions = {...(options.logstashOptions || {}), ...defaultLogstashOptions};
  // the logger is a singleton so if we already have one we just return it.
  if (!logger) {
    const transports = [new (winston.transports.Console)(defaultConsoleOptions)];
    // only add the logstash transport if it is enabled.
    options.tcpEnabled && transports.push(new (winston.transports.Logstash)(logstashOptions));
    logger = new (winston.Logger)({transports});

    // keep a reference to the log so if we are called again we can just return it.
    log = {
      silly: (message, meta) => {
        meta = meta || {};
        logger.silly(message, {...defaultMeta, ...meta})
      },
      debug: (message, meta) => {
        meta = meta || {};
        logger.debug(message, {...defaultMeta, ...meta})
      },
      verbose: (message, meta) => {
        meta = meta || {};
        logger.verbose(message, {...defaultMeta, ...meta})
      },
      info: (message, meta) => {
        meta = meta || {};
        logger.info(message, {...defaultMeta, ...meta})
      },
      warn: (message, meta) => {
        meta = meta || {};
        logger.warn(message, {...defaultMeta, ...meta})
      },
      error: (message, meta) => {
        meta = meta || {};
        logger.error(message, {...defaultMeta, ...meta})
      }
    }
  }

  return log;
};