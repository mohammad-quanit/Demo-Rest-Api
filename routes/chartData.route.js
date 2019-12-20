const router = require('express').Router();

let ChartData = require('../models/chartData.model');

// Chart Data get request
router.route('/').get((req, res) => {
  ChartData.find()
    .then(dataNums => res.status(200).json(dataNums))
    .catch(err => res.sendStatus(400).json(`Error getting Numbers, ${err}`));
});

// Chart Data post request
router.route('/add').post((req, res) => {
  const dataNumbers = req.body.dataNumbers;
  const newNums = new ChartData({ dataNumbers });
  newNums.save()
    .then(dataNums => res.status(200).json(dataNums))
    .catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
  const dataNumbers = req.body.dataNumbers;
  // const updatedExercise = {
  //   username,
  //   description,
  //   duration,
  //   date
  // };
  ChartData.findByIdAndUpdate(
    req.params.id,
    { $set: dataNumbers },
    { new: true }
  )
    .then(dataNums => res.status(200).json(dataNums))
    .catch(err => res.status(400).json(err));
});

module.exports = router;