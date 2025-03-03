const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define a Mongoose Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  major: String,
  age: Number,
});

const Student = mongoose.model("Student", studentSchema);

// API to get all students from MongoDB
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching students" });
  }
});

// API to add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, rollNo, major, age } = req.body;
    const newStudent = new Student({ name, rollNo, major, age });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding student" });
  }
});

// API to delete a student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

// API to update a student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "Error updating student" });
  }
});

// Default route to check if server is running
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});