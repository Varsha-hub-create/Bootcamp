require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const cors = require("cors");

const app = express();
const PORT = 3000;

// ✅ MongoDB Connection
const mongoURI = "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000, // Timeout for connection
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true },
});

const Student = mongoose.model("Student", studentSchema);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the Student API!");
});

// ✅ CRUD Routes
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid student ID" });

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, age, major, rollNo } = req.body;
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) return res.status(400).json({ error: "rollNo already exists" });

    const newStudent = new Student({ name, age, major, rollNo });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid student ID" });

    const { name, age, major, rollNo } = req.body;
    if (rollNo) {
      const existingStudent = await Student.findOne({ rollNo, _id: { $ne: id } });
      if (existingStudent) return res.status(400).json({ error: "rollNo already exists" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, { name, age, major, rollNo }, { new: true, runValidators: true });
    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid student ID" });

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
