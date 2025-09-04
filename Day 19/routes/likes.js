const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Like a post
router.post('/:post_id', auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    // Check if post exists
    const post = await db.query('SELECT * FROM posts WHERE post_id = $1', [post_id]);
    
    if (post.rows.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has already been liked by this user
    const existingLike = await db.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [post_id, req.user.id]
    );

    if (existingLike.rows.length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    const newLike = await db.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
      [post_id, req.user.id]
    );

    res.status(201).json(newLike.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Unlike a post
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    // Check if the like exists
    const like = await db.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [post_id, req.user.id]
    );

    if (like.rows.length === 0) {
      return res.status(404).json({ msg: 'Like not found' });
    }

    await db.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
      [post_id, req.user.id]
    );

    res.json({ msg: 'Post unliked' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all likes for a post
router.get('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;

    const likes = await db.query(
      'SELECT l.*, u.username FROM likes l JOIN users u ON l.user_id = u.user_id WHERE l.post_id = $1',
      [post_id]
    );

    res.json(likes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Check if user has liked a post
router.get('/check/:post_id', auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    const like = await db.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [post_id, req.user.id]
    );

    res.json({ liked: like.rows.length > 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;