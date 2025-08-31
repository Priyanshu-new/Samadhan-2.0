import axios from 'axios';

export const loginApi = async (username, password) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', {
      email: username,
      password: password,
    });
    return { success: true, name: 'Mock User', token: response.data.token };
  } catch (error) {
    throw new Error('Invalid login');
  }
};
