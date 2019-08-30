
const express = require('express');
const router = express.Router();


const { getAllUsers, getStats } = require('../helpers/user');

router.get('/route1', function(req, res) {
  res.send({ data: 'you visited route1' })
})

router.get('/route2/:someId', function(req, res) {
  res.send({ data: 'you visited route2' })
})

router.get('/route3', function(req, res) {
  const { something } = req.body;
  res.send({ data: 'you visited route2' });
});

router.get('/stats', async (req, res) => {
  const users = await getAllUsers();
  stats = getStats(users);
  res.render('index', stats);
});

module.exports = router;
