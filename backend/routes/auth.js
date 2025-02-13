const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = jwt.sign(
      { email: email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "User created successfully. Please check your email to verify your account." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add email verification logic
const sendVerificationEmail = async (email, verificationToken) => {
  // We'll implement email sending here
};

router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Create and assign token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Logged in successfully',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
