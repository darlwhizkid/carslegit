const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendVerificationEmail } = require('../config/email');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      verificationToken
    });

    await user.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    const msg = {
      to: email,
      from: 'your-verified-sender@carslegit.com',
      subject: 'Verify your CarsLegit account',
      text: `Please click on the link to verify your account: ${verificationLink}`,
      html: `<p>Please click <a href="${verificationLink}">here</a> to verify your account</p>`
    };

    await sgMail.send(msg);

    res.status(201).json({ message: "User created successfully. Please check your email for verification." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with this token
    const user = await User.findOne({ 
      email: decoded.email,
      verificationToken: token 
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to login page
    res.redirect(`${process.env.FRONTEND_URL}/login.html`);
  } catch (error) {
    res.status(400).json({ message: "Invalid verification token" });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

// Login route
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Check if user is verified
      if (!user.isVerified) {
        return res.status(401).json({ message: "Please verify your email first" });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create and assign token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
});

// Password reset request
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    res.json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({
      email: decoded.email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid reset token' });
  }
});
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.json(user);
});

router.put('/profile', auth, async (req, res) => {
  // Update profile logic
});

const auth = require('../middleware/auth.middleware');
