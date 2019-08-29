const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, done) => {
  try {
    const token = req.body.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
    if (token) {
      jwt.verify(token, process.env.SECRET, async function(err, decoded) {
        if (decoded) {
          const { username } = decoded;
          const user = await User.find({ username });
          if (user) {
            await User.update({ username }, { $addToSet: { activity: req.locals.user } });
          }
        }
      });
    }
    
  } catch (err) {
    done(err);
  }
  done();
};
