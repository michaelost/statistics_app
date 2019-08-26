module.exports = function (req, res, next) {
  const { browser, version, os, platform } = req.useragent;
  next();
};
