const axios = require('axios');

// Enable detailed axios error logging
axios.interceptors.request.use(request => {
  console.log('Request:', request.method, request.url);
  console.log('Request Data:', request.data);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response Status:', response.status);
    return response;
  },
  error => {
    console.log('Error Status:', error.response ? error.response.status : 'No response');
    console.log('Error Data:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// Test user data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

const API_URL = 'http://localhost:5000/api';

// Test registration
async function testRegistration() {
  try {
    console.log('Testing user registration...');
    const res = await axios.post(`${API_URL}/users/register`, testUser);
    console.log('Registration successful!');
    console.log('Token:', res.data.token);
    console.log('User:', res.data.user);
    return res.data.token;
  } catch (err) {
    console.error('Registration failed:', err.response ? err.response.data : err.message);
    // If user already exists, try login instead
    return await testLogin();
  }
}

// Test login
async function testLogin() {
  try {
    console.log('\nTesting user login...');
    const res = await axios.post(`${API_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Login successful!');
    console.log('Token:', res.data.token);
    console.log('User:', res.data.user);
    return res.data.token;
  } catch (err) {
    console.error('Login failed:', err.response ? err.response.data : err.message);
    return null;
  }
}

// Test profile access
async function testProfileAccess(token) {
  try {
    console.log('\nTesting profile access...');
    const res = await axios.get(`${API_URL}/profile/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    console.log('Profile access successful!');
    console.log('Profile data:', res.data);
  } catch (err) {
    console.error('Profile access failed:', err.response ? err.response.data : err.message);
  }
}

// Run tests
async function runTests() {
  try {
    // First register/login
    const token = await testRegistration();
    
    if (token) {
      // Then test profile access with the token
      await testProfileAccess(token);
    }
  } catch (err) {
    console.error('Test failed:', err.message);
  }
}

// Run all tests
runTests();