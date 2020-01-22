const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: false, trim: true },
  role: { type: String, default: "user", trim: true },
}, {
    timestamps: true
  });

module.exports = mongoose.model('Users', userSchema);