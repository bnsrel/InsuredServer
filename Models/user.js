const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  visitCount: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  }
});

module.exports = mongoose.model('user', userModel);
