const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
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
});

const UserSchema = new Schema({
  username: String,
  password: String,
  activity: [ActivitySchema],
});

module.exports = mongoose.model('User', UserSchema);
