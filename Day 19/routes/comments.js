const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Add comment to a post
router.post('/:post_id', auth, async (req, res) => {
  try {
    const { post_id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ msg: 'Comment text is required' });
    }

    // Check if post exists
    const post = await db.query('SELECT * FROM posts WHERE post_id = $1', [post_id]);
    
    if (post.rows.length === 0) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = await db.query(
      'INSERT INTO comments (post_id, user_id, text) VALUES ($1, $2, $3) RETURNING *',
      [post_id, req.user.id, text]
    );

    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all comments for a post
router.get('/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;

    const comments = await db.query(
      'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.user_id WHERE c.post_id = $1 ORDER BY c.created_at DESC',
      [post_id]
    );

    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a comment
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Check if comment exists and belongs to user
    const comment = await db.query(
      'SELECT * FROM comments WHERE comment_id = $1',
      [id]
    );

    if (comment.rows.length === 0) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const updatedComment = await db.query(
      'UPDATE comments SET text = $1 WHERE comment_id = $2 RETURNING *',
      [text, id]
    );

    res.json(updatedComment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if comment exists and belongs to user
    const comment = await db.query(
      'SELECT * FROM comments WHERE comment_id = $1',
      [id]
    );

    if (comment.rows.length === 0) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await db.query('DELETE FROM comments WHERE comment_id = $1', [id]);

    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
