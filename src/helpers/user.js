const User = require('../models/user');

const getUser = async (username) => {
  User.findOne({ username });
}

module.exports = {
  getUser,
};
