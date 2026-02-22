const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('./auth');

router.get('/protected', authenticate, authorize(['admin']), (req, res) => {
  res.send('Hello, ' + req.user.name);
});

module.exports = router;