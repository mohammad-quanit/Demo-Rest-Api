// const winston = require('winston');
// const logConfig = {
//   'transports': [
//     new winston.transports.File({
//       filename: './logs/loggers.log'
//     })
//   ]
// }
// const logger = winston.createLogger(logConfig);

var log4js = require('log4js');

log4js.configure({
  appenders: {
    everything: {
      type: 'dateFile',
      filename: './logs/loggers.log',
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['everything'], level: 'debug' }
  }
});

const logger = log4js.getLogger();

module.exports = logger;