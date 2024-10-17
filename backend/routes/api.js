// backend/routes/api.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure to import your User model

// Example API route
router.get("/hello", (req, res) => {
  res.send("Hello from the backend!");
});

// Check session route
router.get("/check-session", async (req, res) => {
  // Check if the user is logged in
  const isLoggedIn = req.session && req.session.isLoggedIn ? req.session.isLoggedIn : false;

  if (isLoggedIn) {
    try {
      // Assuming user ID is stored in session
      const user = await User.findById(req.session.userId).select("isAdmin");
      if (user) {
        return res.status(200).json({
          isLoggedIn,
          isAdmin: user.isAdmin, // Return admin status
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ isLoggedIn: false, error: "Server error" });
    }
  }

  // If not logged in or user not found
  return res.status(200).json({
    isLoggedIn,
    isAdmin: false, // Default to false if not logged in
  });
});


module.exports = router;
