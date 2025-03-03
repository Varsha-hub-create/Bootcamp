import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file
const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className="p-4">
          
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Major</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{student.rollNo}</td>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.major}</td>
              <td className="border border-gray-300 px-4 py-2">{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
