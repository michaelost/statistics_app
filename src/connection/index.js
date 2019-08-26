const mongoose = require('mongoose');
const logger = require('winston');

const { MONGO_URL } = process.env;

let connection = null;

const getConnection = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(MONGO_URL, {useNewUrlParser: true});
      logger.info(`connected to ${MONGO_URL}`);
      return connection; 
    }
    return connection;
  } catch (err) {
    logger.debug(err);
  }
}

module.exports = getConnection;
