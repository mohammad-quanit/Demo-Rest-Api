const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartDataSchema = new Schema({
  dataNumbers: { type: Array, required: true },
}, {
    timestamps: true
  });


const ChartData = mongoose.model('ChartData', chartDataSchema);
module.exports = ChartData;