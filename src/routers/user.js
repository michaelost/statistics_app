const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async function(req, res) {
  try {

    if (!req.body.password || !req.body.username) {
      res.status(403).send({
        message: 'missing password or username',
      })
    }
    
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
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

module.exports = router;
