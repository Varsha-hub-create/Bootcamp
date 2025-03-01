require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Use environment variable or fallback to hardcoded URI
const mongoURI = process.env.MONGO_URI || "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

if (!mongoURI) {
  console.error("❌ MongoDB Connection Error: MONGO_URI is not set in .env");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Student Schema
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

// ✅ Get All Students (Pagination)
app.get("/students", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);

    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalStudents,
      totalPages,
      currentPage: page,
      students,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Get Student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Update a Student
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Delete a Student
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
