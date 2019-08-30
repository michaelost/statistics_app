const User = require('../models/user');
const users = require('./data.json');

module.exports = async () => {
  try {
    const existingUsers = await User.find({});
    if (!existingUsers.length) {
      await User.insertMany(users);
    }
  } catch (err) {
    console.log(err)
  }
};
