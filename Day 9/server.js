const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const students = [
  { id: 1, name: 'Priyanshu Kesharwani', major: 'Computer Science' },
  { id: 2, name: 'Mohammd Ahfaz ', major: 'Electrical Engineering' },
  { id: 3, name: 'Palak Gupta ', major: 'Mechanical Engineering' },
  { id: 4, name: 'Jon Sinha ', major: 'Biology' },
  { id: 5, name: 'Iron Men ', major: 'Physics' }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
