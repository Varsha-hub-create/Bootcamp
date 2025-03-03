import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h2>{student.name}</h2>
      <div className="student-info">
        <p><strong>ID:</strong> {student.rollNo}</p>
        <p><strong>Major:</strong> {student.major}</p>
        <p><strong>Year:</strong> {student.age}</p>
      </div>
    </div>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Loading students...</p>;

  return (
    <div className="student-list-container">
      <h1>Student Information</h1>
      <div className="student-grid">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
