// backend/routes/api.js
const express = require("express");
const router = express.Router();

// Example API route
router.get("/hello", (req, res) => {
  res.send("Hello from the backend!");
});
router.get("/check-session", (req, res) => {
  console.log("Checking session:");
  console.log("Session object:", req.session); // Log the whole session object
  const isLoggedIn = req.session && req.session.isLoggedIn ? req.session.isLoggedIn : false;
  return res.status(200).json({ isLoggedIn });
});


module.exports = router;
