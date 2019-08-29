const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config()

const logger = require('./middelware/logger');
const stats = require('./middelware/stats');
const activity = require('./middelware/activity');
const useragent = require('express-useragent');

const getConnection = require('./connection');
getConnection();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(useragent.express());
app.use(logger);
app.use(stats);
app.use(activity);

app.get('/', function (req, res){
  res.send({});
  
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
