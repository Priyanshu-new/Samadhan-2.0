const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const students = [
  { id: 1, name: 'Alice Johnson', major: 'Computer Science' },
  { id: 2, name: 'Bob Williams', major: 'Electrical Engineering' },
  { id: 3, name: 'Charlie Davis', major: 'Mechanical Engineering' },
  { id: 4, name: 'Diana Miller', major: 'Biology' },
  { id: 5, name: 'Ethan Wilson', major: 'Physics' }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
