import React, { useState } from "react";
import "./App.css";

const StudentCard = ({ student, onRemove }) => {
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
      <button className="remove-btn" onClick={() => onRemove(student.name)}>
        Remove
      </button>
    </div>
  );
};


const StudentList = () => {
  const [students, setStudents] = useState([
    { name: "Varsha", major: "Chemistry", year: "Fresher" },
    { name: "Madhu", major: "Mathematics", year: "Senior" },
    { name: "Kalai", major: "Physics", year: "Junior" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", major: "", year: "Fresher" });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    if (!newStudent.name.trim() || !newStudent.major.trim()) {
      alert("Please enter a valid name and major!");
      return;
    }
    setStudents([...students, newStudent]);
    setNewStudent({ name: "", major: "", year: "Fresher" }); // Reset form
  };

  const removeStudent = (name) => {
    setStudents(students.filter((student) => student.name !== name));
  };

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

      {/* Add Student Form */}
      <div className="add-student-form">
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="major"
          placeholder="Enter major"
          value={newStudent.major}
          onChange={handleInputChange}
        />
        <select name="year" value={newStudent.year} onChange={handleInputChange}>
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <button className="add-btn" onClick={addStudent}>
          Add Student
        </button>
      </div>

      {/* Student List */}
      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <StudentCard key={index} student={student} onRemove={removeStudent} />
          ))
        ) : (
          <p className="no-results">No students found.</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Directory</h1>
      <StudentList />
    </div>
  );
};

export default App;
