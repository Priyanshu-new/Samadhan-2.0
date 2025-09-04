const axios = require('axios');

// Configure axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request/response interceptors for debugging
api.interceptors.request.use(request => {
  console.log('Request:', request.method, request.url);
  console.log('Request Data:', request.data);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response;
  },
  error => {
    console.log('Error Status:', error.response?.status);
    console.log('Error Data:', error.response?.data);
    return Promise.reject(error);
  }
);

// Store auth token and user data
let authToken = '';
let userId = null;
let testPostId = null;
let testCommentId = null;

// Test user credentials
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

// Test functions
async function registerOrLogin() {
  try {
    // Try to register first
    console.log('\n--- Testing User Registration ---');
    const registerResponse = await api.post('/users/register', testUser);
    authToken = registerResponse.data.token;
    userId = registerResponse.data.user.user_id;
    console.log('Registration successful');
  } catch (error) {
    // If user already exists, try to login
    console.log('User might already exist, trying login...');
    try {
      console.log('\n--- Testing User Login ---');
      const loginResponse = await api.post('/users/login', {
        email: testUser.email,
        password: testUser.password
      });
      authToken = loginResponse.data.token;
      userId = loginResponse.data.user.user_id;
      console.log('Login successful');
    } catch (loginError) {
      console.error('Login failed:', loginError.message);
      process.exit(1);
    }
  }

  // Set auth token for subsequent requests
  api.defaults.headers.common['x-auth-token'] = authToken;
}

async function createPost() {
  try {
    console.log('\n--- Testing Post Creation ---');
    const postResponse = await api.post('/posts', {
      content: 'This is a test post!'
    });
    testPostId = postResponse.data.post_id;
    console.log('Post created successfully with ID:', testPostId);
    return true;
  } catch (error) {
    console.error('Post creation failed:', error.message);
    return false;
  }
}

async function getAllPosts() {
  try {
    console.log('\n--- Testing Get All Posts ---');
    await api.get('/posts');
    console.log('Retrieved all posts successfully');
    return true;
  } catch (error) {
    console.error('Get all posts failed:', error.message);
    return false;
  }
}

async function getPostById() {
  try {
    console.log('\n--- Testing Get Post By ID ---');
    await api.get(`/posts/${testPostId}`);
    console.log('Retrieved post successfully');
    return true;
  } catch (error) {
    console.error('Get post by ID failed:', error.message);
    return false;
  }
}

async function updatePost() {
  try {
    console.log('\n--- Testing Update Post ---');
    await api.put(`/posts/${testPostId}`, {
      content: 'This is an updated test post!'
    });
    console.log('Post updated successfully');
    return true;
  } catch (error) {
    console.error('Update post failed:', error.message);
    return false;
  }
}

async function createComment() {
  try {
    console.log('\n--- Testing Comment Creation ---');
    const commentResponse = await api.post(`/comments/${testPostId}`, {
      text: 'This is a test comment!'
    });
    testCommentId = commentResponse.data.comment_id;
    console.log('Comment created successfully with ID:', testCommentId);
    return true;
  } catch (error) {
    console.error('Comment creation failed:', error.message);
    return false;
  }
}

async function getPostComments() {
  try {
    console.log('\n--- Testing Get Post Comments ---');
    await api.get(`/comments/${testPostId}`);
    console.log('Retrieved comments successfully');
    return true;
  } catch (error) {
    console.error('Get comments failed:', error.message);
    return false;
  }
}

async function updateComment() {
  try {
    console.log('\n--- Testing Update Comment ---');
    await api.put(`/comments/${testCommentId}`, {
      text: 'This is an updated test comment!'
    });
    console.log('Comment updated successfully');
    return true;
  } catch (error) {
    console.error('Update comment failed:', error.message);
    return false;
  }
}

async function likePost() {
  try {
    console.log('\n--- Testing Like Post ---');
    await api.post(`/likes/${testPostId}`);
    console.log('Post liked successfully');
    return true;
  } catch (error) {
    console.error('Like post failed:', error.message);
    return false;
  }
}

async function checkLike() {
  try {
    console.log('\n--- Testing Check Like ---');
    await api.get(`/likes/check/${testPostId}`);
    console.log('Like check successful');
    return true;
  } catch (error) {
    console.error('Like check failed:', error.message);
    return false;
  }
}

async function getPostLikes() {
  try {
    console.log('\n--- Testing Get Post Likes ---');
    await api.get(`/likes/${testPostId}`);
    console.log('Retrieved likes successfully');
    return true;
  } catch (error) {
    console.error('Get likes failed:', error.message);
    return false;
  }
}

async function unlikePost() {
  try {
    console.log('\n--- Testing Unlike Post ---');
    await api.delete(`/likes/${testPostId}`);
    console.log('Post unliked successfully');
    return true;
  } catch (error) {
    console.error('Unlike post failed:', error.message);
    return false;
  }
}

async function deleteComment() {
  try {
    console.log('\n--- Testing Delete Comment ---');
    await api.delete(`/comments/${testCommentId}`);
    console.log('Comment deleted successfully');
    return true;
  } catch (error) {
    console.error('Delete comment failed:', error.message);
    return false;
  }
}

async function deletePost() {
  try {
    console.log('\n--- Testing Delete Post ---');
    await api.delete(`/posts/${testPostId}`);
    console.log('Post deleted successfully');
    return true;
  } catch (error) {
    console.error('Delete post failed:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting Social Platform API Tests');
  
  // Authentication
  await registerOrLogin();
  
  // Posts
  if (!await createPost()) return;
  if (!await getAllPosts()) return;
  if (!await getPostById()) return;
  if (!await updatePost()) return;
  
  // Comments
  if (!await createComment()) return;
  if (!await getPostComments()) return;
  if (!await updateComment()) return;
  
  // Likes
  if (!await likePost()) return;
  if (!await checkLike()) return;
  if (!await getPostLikes()) return;
  if (!await unlikePost()) return;
  
  // Cleanup
  if (!await deleteComment()) return;
  if (!await deletePost()) return;
  
  console.log('\n--- All tests completed successfully! ---');
}

// Run the tests
runTests().catch(err => {
  console.error('Test failed:', err.message);
});