const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await db.query(
      'SELECT user_id, username, email, created_at FROM users WHERE user_id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  try {
    const { username } = req.body;

    // Check if username is already taken
    if (username) {
      const usernameCheck = await db.query(
        'SELECT * FROM users WHERE username = $1 AND user_id != $2',
        [username, req.user.id]
      );

      if (usernameCheck.rows.length > 0) {
        return res.status(400).json({ msg: 'Username already taken' });
      }

      // Update username
      await db.query(
        'UPDATE users SET username = $1 WHERE user_id = $2',
        [username, req.user.id]
      );
    }

    // Get updated user profile
    const updatedUser = await db.query(
      'SELECT user_id, username, email, created_at FROM users WHERE user_id = $1',
      [req.user.id]
    );

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;