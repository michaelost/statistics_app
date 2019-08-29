const User = require('../models/user');

const getUser = async (username) => {
  return User.findOne({ username });
}

const saveUser = async (user) => (new User(user)).save()

module.exports = {
  getUser,
  saveUser,
};
