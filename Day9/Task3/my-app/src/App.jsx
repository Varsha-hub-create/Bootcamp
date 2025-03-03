import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className="app-container">
      <h1>Student List</h1>
      <div className="student-grid">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.studentID} className="student-card">
              <img src="/pg.png" alt="Student" />
              <div className="student-info">
                <h3>{student.name}</h3>
                <p><strong>ID:</strong> {student.rollNo}</p>
                <p><strong>Major:</strong> {student.major}</p>
                <p><strong>Age:</strong> {student.age}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">No students found...</p>
        )}
      </div>
    </div>
  );
}

export default App;
