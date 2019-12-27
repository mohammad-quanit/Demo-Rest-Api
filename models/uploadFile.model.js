const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileUpload = new Schema({
  FileUpload: {
    type: File,
  }
}, {
    timestamps: true
  });

const FileUpload = mongoose.model('FileUpload', FileUpload);
module.exports = User