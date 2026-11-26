const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin and return JWT
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password.',
      });
    }

    const cleanUsername = username.trim().toLowerCase();
    const admin = await Admin.findOne({ username: cleanUsername });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.',
      });
    }

    // Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'sumathi_agencies_secret_jwt_key_2026_solar_secure',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current admin profile
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }
    return res.json({ success: true, user: admin });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
