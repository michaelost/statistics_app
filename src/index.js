const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config()

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const logger = require('./middelware/logger');
const stats = require('./middelware/stats');
const activity = require('./middelware/activity');
const useragent = require('express-useragent');

const userRouter = require('./routers/user');
const apiRouter = require('./routers/api');

const getConnection = require('./connection');
getConnection();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(useragent.express());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ url: process.env.MONGO_URL }),
}));

app.use(logger);
app.use(stats);
app.use(activity);

app.use('/user', userRouter);
app.use('/api', apiRouter);

app.get('/', function (req, res){
  res.send({});
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
