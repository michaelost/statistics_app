const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { saveUser } = require('../helpers/user');

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
    } else {
      if (!req.session.userId) {
        const { _id } = await saveUser({ activity: req.locals.user });
        req.session.userId = _id
      } else {
        await User.update({ _id: req.session.userId }, { $addToSet: { activity: req.locals.user } });
      }
    }
    
  } catch (err) {
    done(err);
  }
  done();
};
