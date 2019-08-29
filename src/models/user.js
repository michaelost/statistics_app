const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  geo: {
    ip: String,
    city: String,
    region: String,
    country: String,
    loc: String,
    postal: String,
  },
  client: {
    browser: String,
    version: String,
    os: String,
    platform: String,
  },
  username: String,
  password: String,
  activity: Object,
});

module.exports = mongoose.model('User', orderSchema);
