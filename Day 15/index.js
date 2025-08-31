const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'student' && password === 'davegray') {
    return res.json({ success: true, name: 'Student' });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
