const router = require('express').Router();
const fs = require('fs');
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
  appenders: {everything: { type: 'dateFile', filename: './logs/all-the-logs.log' }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
});

const logger = log4js.getLogger();

router.route('/').post((req, res) => {
  logger.info(`${JSON.stringify(req.body.notetext)} succesfully added/Updated.`);
  return res.status(200).json(req.body.notetext);
});

module.exports = router;
