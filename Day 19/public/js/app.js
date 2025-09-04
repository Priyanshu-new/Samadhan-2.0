// API URL
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const mainContent = document.getElementById('main-content');
const userWelcome = document.getElementById('user-welcome');
const postsContainer = document.getElementById('posts-container');
const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');

// Templates
const postTemplate = document.getElementById('post-template');
const commentTemplate = document.getElementById('comment-template');

// Auth State
let authToken = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user'));

// Initialize app
function init() {
  // Check if user is logged in
  if (authToken && currentUser) {
    showMainContent();
    loadPosts();
  } else {
    showAuthSection();
  }

  // Event listeners
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  postForm.addEventListener('submit', handleCreatePost);
  logoutBtn.addEventListener('click', handleLogout);
}

// Show/hide sections
function showAuthSection() {
  authSection.classList.remove('d-none');
  mainContent.classList.add('d-none');
}

function showMainContent() {
  authSection.classList.add('d-none');
  mainContent.classList.remove('d-none');
  userWelcome.textContent = `Welcome, ${currentUser.username}!`;
}

// API Calls with Fetch
async function apiCall(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (authToken) {
    headers['x-auth-token'] = authToken;
  }

  const config = {
    method,
    headers
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.msg || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    showAlert(error.message, 'danger');
    throw error;
  }
}

// Auth handlers
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const data = await apiCall('/users/login', 'POST', { email, password });
    setAuthData(data.token, data.user);
    showMainContent();
    loadPosts();
    loginForm.reset();
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const data = await apiCall('/users/register', 'POST', { username, email, password });
    setAuthData(data.token, data.user);
    showMainContent();
    loadPosts();
    registerForm.reset();
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  authToken = null;
  currentUser = null;
  showAuthSection();
}

function setAuthData(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  authToken = token;
  currentUser = user;
}

// Post handlers
async function handleCreatePost(e) {
  e.preventDefault();
  const content = postContent.value;

  try {
    await apiCall('/posts', 'POST', { content });
    postForm.reset();
    loadPosts();
    showAlert('Post created successfully!', 'success');
  } catch (error) {
    console.error('Create post failed:', error);
  }
}

async function handleEditPost(postId, currentContent) {
  const newContent = prompt('Edit your post:', currentContent);
  if (!newContent || newContent === currentContent) return;

  try {
    await apiCall(`/posts/${postId}`, 'PUT', { content: newContent });
    loadPosts();
    showAlert('Post updated successfully!', 'success');
  } catch (error) {
    console.error('Update post failed:', error);
  }
}

async function handleDeletePost(postId) {
  if (!confirm('Are you sure you want to delete this post?')) return;

  try {
    await apiCall(`/posts/${postId}`, 'DELETE');
    loadPosts();
    showAlert('Post deleted successfully!', 'success');
  } catch (error) {
    console.error('Delete post failed:', error);
  }
}

// Comment handlers
async function handleAddComment(e, postId) {
  e.preventDefault();
  const commentInput = e.target.querySelector('.comment-input');
  const text = commentInput.value;

  try {
    await apiCall(`/comments/${postId}`, 'POST', { text });
    commentInput.value = '';
    loadComments(postId, e.target.closest('.post-card').querySelector('.comments-container'));
    showAlert('Comment added successfully!', 'success');
  } catch (error) {
    console.error('Add comment failed:', error);
  }
}

async function handleEditComment(commentId, currentText) {
  const newText = prompt('Edit your comment:', currentText);
  if (!newText || newText === currentText) return;

  try {
    await apiCall(`/comments/${commentId}`, 'PUT', { text: newText });
    // Refresh comments for the parent post
    const commentEl = document.querySelector(`[data-comment-id="${commentId}"]`);
    const postCard = commentEl.closest('.post-card');
    const postId = postCard.dataset.postId;
    loadComments(postId, postCard.querySelector('.comments-container'));
    showAlert('Comment updated successfully!', 'success');
  } catch (error) {
    console.error('Update comment failed:', error);
  }
}

async function handleDeleteComment(commentId) {
  if (!confirm('Are you sure you want to delete this comment?')) return;

  try {
    await apiCall(`/comments/${commentId}`, 'DELETE');
    // Refresh comments for the parent post
    const commentEl = document.querySelector(`[data-comment-id="${commentId}"]`);
    const postCard = commentEl.closest('.post-card');
    const postId = postCard.dataset.postId;
    loadComments(postId, postCard.querySelector('.comments-container'));
    showAlert('Comment deleted successfully!', 'success');
  } catch (error) {
    console.error('Delete comment failed:', error);
  }
}

// Like handlers
async function handleToggleLike(postId, likeButton) {
  try {
    // Check if already liked
    const checkResponse = await apiCall(`/likes/check/${postId}`);
    
    if (checkResponse.liked) {
      // Unlike
      await apiCall(`/likes/${postId}`, 'DELETE');
      likeButton.classList.remove('liked');
    } else {
      // Like
      await apiCall(`/likes/${postId}`, 'POST');
      likeButton.classList.add('liked');
    }
    
    // Update like count
    const likesResponse = await apiCall(`/likes/${postId}`);
    const likeCountEl = likeButton.nextElementSibling;
    likeCountEl.textContent = likesResponse.length;
  } catch (error) {
    console.error('Toggle like failed:', error);
  }
}

// Data loading functions
async function loadPosts() {
  try {
    const posts = await apiCall('/posts');
    renderPosts(posts);
  } catch (error) {
    console.error('Load posts failed:', error);
  }
}

async function loadComments(postId, commentsContainer) {
  try {
    const comments = await apiCall(`/comments/${postId}`);
    renderComments(comments, commentsContainer);
  } catch (error) {
    console.error('Load comments failed:', error);
  }
}

async function checkIfLiked(postId, likeButton) {
  try {
    const response = await apiCall(`/likes/check/${postId}`);
    if (response.liked) {
      likeButton.classList.add('liked');
    } else {
      likeButton.classList.remove('liked');
    }
  } catch (error) {
    console.error('Check like failed:', error);
  }
}

async function getLikeCount(postId, likeCountEl) {
  try {
    const likes = await apiCall(`/likes/${postId}`);
    likeCountEl.textContent = likes.length;
  } catch (error) {
    console.error('Get like count failed:', error);
  }
}

// Rendering functions
function renderPosts(posts) {
  postsContainer.innerHTML = '';
  
  if (posts.length === 0) {
    postsContainer.innerHTML = '<p class="text-center">No posts yet. Be the first to post!</p>';
    return;
  }

  posts.forEach(post => {
    const postEl = document.importNode(postTemplate.content, true);
    const postCard = postEl.querySelector('.post-card');
    
    // Set post data
    postCard.dataset.postId = post.post_id;
    postEl.querySelector('.post-username').textContent = post.username;
    postEl.querySelector('.post-content').textContent = post.content;
    postEl.querySelector('.post-date').textContent = new Date(post.created_at).toLocaleString();
    
    // Set up like button
    const likeButton = postEl.querySelector('.like-button');
    const likeCountEl = postEl.querySelector('.like-count');
    likeButton.addEventListener('click', () => handleToggleLike(post.post_id, likeButton));
    
    // Check if post is liked and get like count
    checkIfLiked(post.post_id, likeButton);
    getLikeCount(post.post_id, likeCountEl);
    
    // Set up comment toggle
    const commentToggleBtn = postEl.querySelector('.comment-toggle-btn');
    const commentSection = postEl.querySelector('.comment-section');
    commentToggleBtn.addEventListener('click', () => {
      commentSection.classList.toggle('d-none');
      if (!commentSection.classList.contains('d-none')) {
        loadComments(post.post_id, commentSection.querySelector('.comments-container'));
      }
    });
    
    // Set up comment form
    const commentForm = postEl.querySelector('.comment-form');
    commentForm.addEventListener('submit', (e) => handleAddComment(e, post.post_id));
    
    // Show edit/delete buttons if post belongs to current user
    if (currentUser && post.user_id === currentUser.user_id) {
      const editBtn = postEl.querySelector('.edit-post-btn');
      const deleteBtn = postEl.querySelector('.delete-post-btn');
      
      editBtn.classList.remove('d-none');
      deleteBtn.classList.remove('d-none');
      
      editBtn.addEventListener('click', () => handleEditPost(post.post_id, post.content));
      deleteBtn.addEventListener('click', () => handleDeletePost(post.post_id));
    }
    
    postsContainer.appendChild(postEl);
  });
}

function renderComments(comments, commentsContainer) {
  commentsContainer.innerHTML = '';
  
  if (comments.length === 0) {
    commentsContainer.innerHTML = '<p class="text-center">No comments yet.</p>';
    return;
  }

  comments.forEach(comment => {
    const commentEl = document.importNode(commentTemplate.content, true);
    const commentItem = commentEl.querySelector('.comment-item');
    
    // Set comment data
    commentItem.dataset.commentId = comment.comment_id;
    commentEl.querySelector('.comment-username').textContent = comment.username;
    commentEl.querySelector('.comment-text').textContent = comment.text;
    commentEl.querySelector('.comment-date').textContent = new Date(comment.created_at).toLocaleString();
    
    // Show edit/delete buttons if comment belongs to current user
    if (currentUser && comment.user_id === currentUser.user_id) {
      const commentActions = commentEl.querySelector('.comment-actions');
      const editBtn = commentEl.querySelector('.edit-comment-btn');
      const deleteBtn = commentEl.querySelector('.delete-comment-btn');
      
      commentActions.classList.remove('d-none');
      
      editBtn.addEventListener('click', () => handleEditComment(comment.comment_id, comment.text));
      deleteBtn.addEventListener('click', () => handleDeleteComment(comment.comment_id));
    }
    
    commentsContainer.appendChild(commentEl);
  });
}

// Utility functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  document.querySelector('.container').insertAdjacentElement('afterbegin', alertDiv);
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    alertDiv.classList.remove('show');
    setTimeout(() => alertDiv.remove(), 150);
  }, 3000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
