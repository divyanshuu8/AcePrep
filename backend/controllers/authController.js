// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport"); // Ensure this line is included

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: info.message || "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      // Log session details
      req.session.userId = user.id; // Set userId
      req.session.isLoggedIn = true; // Set isLoggedIn to true

      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  try {
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

