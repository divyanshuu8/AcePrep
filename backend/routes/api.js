// backend/routes/api.js
const express = require('express');
const router = express.Router();

// Example API route
router.get('/hello', (req, res) => {
  res.send('Hello from the backend!');
});
router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

module.exports = router;
