const { Pool } = require('pg');
require('dotenv').config();

// Mock database for testing purposes
const users = [];
const posts = [];
const comments = [];
const likes = [];

// Mock database functions
const mockDb = {
  query: async (text, params) => {
    console.log('Query:', text);
    console.log('Params:', params);
    
    // Handle user registration
    if (text.includes('INSERT INTO users')) {
      const [username, email, password_hash] = params;
      const user_id = users.length + 1;
      const newUser = { user_id, username, email, password_hash, created_at: new Date() };
      users.push(newUser);
      return { rows: [newUser] };
    }
    
    // Handle user login check
    if (text.includes('SELECT * FROM users WHERE email')) {
      const [email] = params;
      const user = users.find(u => u.email === email);
      return { rows: user ? [user] : [] };
    }
    
    // Handle user profile
    if (text.includes('SELECT user_id, username, email, created_at FROM users WHERE user_id')) {
      const [id] = params;
      const user = users.find(u => u.user_id === parseInt(id));
      return { rows: user ? [user] : [] };
    }
    
    // Handle post creation
    if (text.includes('INSERT INTO posts')) {
      const [user_id, content] = params;
      const post_id = posts.length + 1;
      const newPost = { post_id, user_id: parseInt(user_id), content, created_at: new Date() };
      posts.push(newPost);
      return { rows: [newPost] };
    }
    
    // Handle get all posts
    if (text.includes('SELECT p.*, u.username FROM posts p JOIN users u')) {
      const postsWithUsername = posts.map(post => {
        const user = users.find(u => u.user_id === post.user_id);
        return { ...post, username: user ? user.username : 'unknown' };
      });
      return { rows: postsWithUsername };
    }
    
    // Handle get post by ID
    if (text.includes('SELECT p.*, u.username FROM posts p JOIN users u') && text.includes('WHERE p.post_id')) {
      const [post_id] = params;
      const post = posts.find(p => p.post_id === parseInt(post_id));
      if (post) {
        const user = users.find(u => u.user_id === post.user_id);
        return { rows: [{ ...post, username: user ? user.username : 'unknown' }] };
      }
      return { rows: [] };
    }
    
    // Handle get post by ID (without join)
    if (text.includes('SELECT * FROM posts WHERE post_id')) {
      const [post_id] = params;
      const post = posts.find(p => p.post_id === parseInt(post_id));
      return { rows: post ? [post] : [] };
    }
    
    // Handle update post
    if (text.includes('UPDATE posts SET content')) {
      const [content, post_id] = params;
      const postIndex = posts.findIndex(p => p.post_id === parseInt(post_id));
      if (postIndex !== -1) {
        posts[postIndex].content = content;
        return { rows: [posts[postIndex]] };
      }
      return { rows: [] };
    }
    
    // Handle delete post
    if (text.includes('DELETE FROM posts WHERE post_id')) {
      const [post_id] = params;
      const postIndex = posts.findIndex(p => p.post_id === parseInt(post_id));
      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
      }
      return { rows: [] };
    }
    
    // Handle comment creation
    if (text.includes('INSERT INTO comments')) {
      const [post_id, user_id, text] = params;
      const comment_id = comments.length + 1;
      const newComment = { 
        comment_id, 
        post_id: parseInt(post_id), 
        user_id: parseInt(user_id), 
        text, 
        created_at: new Date() 
      };
      comments.push(newComment);
      return { rows: [newComment] };
    }
    
    // Handle get comments for post
    if (text.includes('SELECT c.*, u.username FROM comments c JOIN users u') && text.includes('WHERE c.post_id')) {
      const [post_id] = params;
      const postComments = comments.filter(c => c.post_id === parseInt(post_id));
      const commentsWithUsername = postComments.map(comment => {
        const user = users.find(u => u.user_id === comment.user_id);
        return { ...comment, username: user ? user.username : 'unknown' };
      });
      return { rows: commentsWithUsername };
    }
    
    // Handle get comment by ID
    if (text.includes('SELECT * FROM comments WHERE comment_id')) {
      const [comment_id] = params;
      const comment = comments.find(c => c.comment_id === parseInt(comment_id));
      return { rows: comment ? [comment] : [] };
    }
    
    // Handle update comment
    if (text.includes('UPDATE comments SET text')) {
      const [text, comment_id] = params;
      const commentIndex = comments.findIndex(c => c.comment_id === parseInt(comment_id));
      if (commentIndex !== -1) {
        comments[commentIndex].text = text;
        return { rows: [comments[commentIndex]] };
      }
      return { rows: [] };
    }
    
    // Handle delete comment
    if (text.includes('DELETE FROM comments WHERE comment_id')) {
      const [comment_id] = params;
      const commentIndex = comments.findIndex(c => c.comment_id === parseInt(comment_id));
      if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
      }
      return { rows: [] };
    }
    
    // Handle like creation
    if (text.includes('INSERT INTO likes')) {
      const [post_id, user_id] = params;
      const like_id = likes.length + 1;
      const newLike = { 
        like_id, 
        post_id: parseInt(post_id), 
        user_id: parseInt(user_id), 
        liked_at: new Date() 
      };
      likes.push(newLike);
      return { rows: [newLike] };
    }
    
    // Handle check if post is liked
    if (text.includes('SELECT * FROM likes WHERE post_id') && text.includes('AND user_id')) {
      const [post_id, user_id] = params;
      const like = likes.find(l => 
        l.post_id === parseInt(post_id) && l.user_id === parseInt(user_id)
      );
      return { rows: like ? [like] : [] };
    }
    
    // Handle get likes for post
    if (text.includes('SELECT l.*, u.username FROM likes l JOIN users u') && text.includes('WHERE l.post_id')) {
      const [post_id] = params;
      const postLikes = likes.filter(l => l.post_id === parseInt(post_id));
      const likesWithUsername = postLikes.map(like => {
        const user = users.find(u => u.user_id === like.user_id);
        return { ...like, username: user ? user.username : 'unknown' };
      });
      return { rows: likesWithUsername };
    }
    
    // Handle delete like
    if (text.includes('DELETE FROM likes WHERE post_id') && text.includes('AND user_id')) {
      const [post_id, user_id] = params;
      const likeIndex = likes.findIndex(l => 
        l.post_id === parseInt(post_id) && l.user_id === parseInt(user_id)
      );
      if (likeIndex !== -1) {
        likes.splice(likeIndex, 1);
      }
      return { rows: [] };
    }
    
    return { rows: [] };
  }
};

module.exports = mockDb;
