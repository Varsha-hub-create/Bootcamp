import React from "react";
import "./App.css"; // Import the CSS file

// StudentCard Component
const StudentCard = ({ student }) => {
  const yearColors = {
    Freshman: "bg-green-200",
    Sophomore: "bg-yellow-200",
    Junior: "bg-blue-200",
    Senior: "bg-red-200",
  };

  const bgColor = yearColors[student.year] || "bg-gray-200";

  return (
    <div className={`shadow-lg rounded-2xl p-4 w-64 ${bgColor}`}>
      <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
      <p className="text-gray-600">Major: {student.major}</p>
      <p className="text-gray-500">Year: {student.year}</p>
    </div>
  );
};

// StudentList Component
const StudentList = ({ students }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {students.map((student, index) => (
        <StudentCard key={index} student={student} />
      ))}
    </div>
  );
};

// Example Usage
const studentsData = [
  { name: "Alice Johnson", major: "Computer Science", year: "Sophomore" },
  { name: "Bob Smith", major: "Mathematics", year: "Junior" },
  { name: "Charlie Brown", major: "Physics", year: "Senior" },
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
