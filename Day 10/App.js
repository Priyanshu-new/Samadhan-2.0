import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Student Directory</h1>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-item">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Major:</strong> {student.major}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
