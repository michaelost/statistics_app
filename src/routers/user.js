const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async function(req, res) {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      res.status(403).send({
        message: 'missing password or username',
      })
    }

    if(await User.findOne({ username })) {
      return res.status(403).send({
        message: 'user exists',
      })
    };
    
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hash    
    });

    await user.save()      
    res.status(200).json({
      success: 'New user has been created'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post('/signin', async function(req, res){
  try {
    const { username, password } = req.body
    const user =  await User.findOne({ username })
    if (!user) {
      res.status(401).send({
        failed: 'user does not exist',
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const JWTToken = jwt.sign({ username, _id: user._id }, 'secret', {
        expiresIn: '2h'
      });
      return res.status(200).json({
        token: JWTToken
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      failed: 'Unauthorized Access'
    });
  }
});

module.exports = router;
