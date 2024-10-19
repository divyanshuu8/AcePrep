// backend/routes/api.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure to import your User model

// DELETE user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Use 'id' instead of '_id'

    // Find the user by ID first
    const user = await User.findById(id); // Retrieve the user document

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      return res.status(403).json({ message: 'Admin users cannot be deleted.' });
    }

    // Proceed to delete the user if not an admin
    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    console.error(error);
  }
});


// API endpoint to fetch users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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

router.post('/start-assessment', (req, res) => {
  // Example logic for starting an assessment
  try {
    // You can access any data sent in the request body using req.body (e.g., assessment details)
    const assessmentData = req.body; 
    
    // Perform any operations related to starting the assessment, such as saving it in a database, etc.
    console.log('Assessment data received:', assessmentData);

    // Send a response back to the client
    res.status(200).json({ message: 'Assessment started successfully', data: assessmentData });
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ message: 'An error occurred while starting the assessment' });
  }
});


module.exports = router;
