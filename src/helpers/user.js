const User = require('../models/user');
const getUser = async username => User.findOne({ username });
const saveUser = async (user) => (new User(user)).save()
const getAllUsers = async () => User.find({});


const getStats = (users) => {

  let stats = {
    platform: {},
    country: {},
    ip: {},
    country: {},
    browser: {},
    endpoint: {},
    city: {},
    region: {},
    visits: 0,
  };

  const inc = (object, key) => {
    if (!object[key]) {
      object[key] = 1;
    } else { object[key] = object[key] + 1; }
  }

  return users.reduce((acc, user) => {
    user.activity.forEach(u => {
      const { browser, os } = u.client;
      const { endpoint } = u;
      const { city, region, ip, country } = u.geo;
      inc(acc.city, city);
      inc(acc.region, region);
      inc(acc.ip, ip);
      inc(acc.browser, browser);
      inc(acc.endpoint, endpoint);
      inc(acc.country, country);
      acc.visits = acc.visits + 1;
    });
    return acc
  }, stats);

}

module.exports = {
  getUser,
  saveUser,
  getAllUsers,
  getStats,
};
