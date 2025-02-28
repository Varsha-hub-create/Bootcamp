import React, { useState } from "react";
import "./App.css";

const StudentCard = ({ student }) => {
  const yearColors = {
    Fresher: "freshman",
    Junior: "junior",
    Senior: "senior",
  };

  return (
    <div className={`student-card ${yearColors[student.year] || "default-card"}`}>
      <h2>{student.name}</h2>
      <p>Major: {student.major}</p>
      <p>Year: {student.year}</p>
    </div>
  );
};

const StudentList = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-container">
      {/* Search Input */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search students by name or major..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))
        ) : (
          <p className="no-results">No students found.</p>
        )}
      </div>
    </div>
  );
};


const studentsData = [
  { name: "Varsha", major: "Chemistry", year: "Fresher" },
  { name: "Madhu", major: "Mathematics", year: "Senior" },
  { name: "Kalai", major: "Physics", year: "Junior" },
  { name: "Nandhu", major: "Computer Science", year: "Junior" },
  { name: "Barby", major: "Electrical Engineering", year: "Senior" },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Directory</h1>
      <StudentList students={studentsData} />
    </div>
  );
};

export default App;
