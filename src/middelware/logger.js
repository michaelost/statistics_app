const logger = require('winston');

module.exports = (req, res, done) => {
  logger.info(req.originalUrl);
  done();
};
