const { getIpInfo } = require('../helpers/ipInfo');

module.exports = function (req, res, next) {
  const { browser, version, os, platform } = req.useragent;
  console.log(req.host)
  next();
};
