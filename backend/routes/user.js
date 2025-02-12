const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User");
const path = require("path");

// Protected route for personalized home page
router.get("/home", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/home.html"));
});

// Get user profile data
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
