const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: 'Content is required' });
    }

    const newPost = await db.query(
      'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
      [req.user.id, content]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.query(
      'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.user_id ORDER BY p.created_at DESC'
    );

    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await db.query(
      'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = $1',
      [id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Check if post exists and belongs to user
    const post = await db.query(
      'SELECT * FROM posts WHERE post_id = $1',
      [id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const updatedPost = await db.query(
      'UPDATE posts SET content = $1 WHERE post_id = $2 RETURNING *',
      [content, id]
    );

    res.json(updatedPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists and belongs to user
    const post = await db.query(
      'SELECT * FROM posts WHERE post_id = $1',
      [id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await db.query('DELETE FROM posts WHERE post_id = $1', [id]);

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;