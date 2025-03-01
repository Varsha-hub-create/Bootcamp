require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection URI (Try IP instead of domain if needed)
const mongoURI = process.env.MONGO_URI || "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

// ❌ Exit if MongoDB URI is missing
if (!mongoURI) {
  console.error("❌ MongoDB Connection Error: MONGO_URI is not set in .env");
  process.exit(1);
}

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection (With Better Handling)
async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Wait 5s before timeout
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}
connectDB();

// ✅ Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 1 },
  major: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true, min: 1 },
});

const Student = mongoose.model("Student", studentSchema);

// ✅ Create a Student
app.post("/students", async (req, res) => {
  try {
    const { name, age, major, rollNo } = req.body;
    if (!name || !age || !major || !rollNo) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const student = new Student({ name, age, major, rollNo });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Search Students by ID or Roll Number
app.get("/students/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required." });
    }

    let students = [];
    const trimmedQ = String(q).trim();

    // 👉 Check if q is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(trimmedQ)) {
      console.log("Searching by ID:", trimmedQ);
      const studentById = await Student.findById(trimmedQ);
      if (studentById) students.push(studentById);
    }

    // 👉 Search by Roll Number (if it's a number)
    if (!isNaN(trimmedQ)) {
      console.log("Searching by Roll No:", trimmedQ);
      const studentByRollNo = await Student.find({ rollNo: Number(trimmedQ) });
      students = [...students, ...studentByRollNo];
    }

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Get All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
