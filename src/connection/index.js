const mongoose = require('mongoose');
const logger = require('winston');

const { MONGO_URL } = process.env;

let connection = null;

const getConnection = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(MONGO_URL, {useNewUrlParser: true});
      console.log(`connected to ${MONGO_URL}`);
      return connection; 
    }
    return connection;
  } catch (err) {
    console.log(err);
  }
}

module.exports = getConnection;
