const router = require('express').Router();
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
  appenders: {fileAppender: {type: 'file', filename: './logs/alertNotes.log'}},
  categories: {default: {appenders: ['fileAppender'], level: 'info'}}
})

const logger = log4js.getLogger();

router.route('/').post((req, res) => {
  logger.info(`${JSON.stringify(req.body.notetext)} succesfully added/Updated.`);
  // logger.info(`${JSON.stringify(exercise)} succesfully added.`)
  return res.status(200).json(req.body.notetext);
});


module.exports = router;