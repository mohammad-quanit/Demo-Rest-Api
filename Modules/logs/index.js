const router = require('express').Router();
const logger = require("../../middlewares/logger");


router.route('/').post((req, res) => {
  logger.info(`${JSON.stringify(req.body.notetext)} succesfully added/Updated.`);
  return res.status(200).json(req.body.notetext);
});

module.exports = router;
