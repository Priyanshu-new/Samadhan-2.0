// server.js
// This file is your "robot friend" that serves the student data.

const express = require('express');
const app = express();
const port = 3000;

const students = [
  { id: 1, name: 'Ramesh', major: 'Computer Science' },
  { id: 2, name: 'Boby', major: 'Mechanical Engineering' },
  { id: 3, name: 'Cristiano', major: 'Biology' }
];

// New route for the main home page (the "/" address).
// This is like adding a new doorbell for your robot friend to answer.
app.get('/', (req, res) => {
  res.send(students);
});

// Our original route for the student data.
app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
