require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const cors = require("cors");
const { body, param, validationResult } = require("express-validator");

const app = express();
const PORT = 3000;

// ✅ MongoDB Connection
const mongoURI = "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
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
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  age: { type: Number, required: true, min: 10, max: 100 },
  major: { type: String, required: true, minlength: 3, maxlength: 50 },
  rollNo: { type: Number, required: true, unique: true, min: 1 },
});

const Student = mongoose.model("Student", studentSchema);

// ✅ Middleware to Handle Validation Errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the Student API!");
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

// ✅ Get Student by ID (with Validation)
app.get(
  "/students/:id",
  [param("id").custom((value) => ObjectId.isValid(value)).withMessage("Invalid student ID")],
  validateRequest,
  async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
);

// ✅ Create a New Student (with Validation)
app.post(
  "/students",
  [
    body("name").isString().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2-50 characters"),
    body("age").isInt({ min: 10, max: 100 }).withMessage("Age must be between 10-100"),
    body("major").isString().isLength({ min: 3, max: 50 }).withMessage("Major must be between 3-50 characters"),
    body("rollNo").isInt({ min: 1 }).withMessage("RollNo must be a positive integer"),
  ],
  validateRequest,
  async (req, res) => {
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
  }
);

// ✅ Update a Student (with Validation)
app.put(
  "/students/:id",
  [
    param("id").custom((value) => ObjectId.isValid(value)).withMessage("Invalid student ID"),
    body("name").optional().isString().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2-50 characters"),
    body("age").optional().isInt({ min: 10, max: 100 }).withMessage("Age must be between 10-100"),
    body("major").optional().isString().isLength({ min: 3, max: 50 }).withMessage("Major must be between 3-50 characters"),
    body("rollNo").optional().isInt({ min: 1 }).withMessage("RollNo must be a positive integer"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
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
  }
);

// ✅ Delete Student (with Validation)
app.delete(
  "/students/:id",
  [param("id").custom((value) => ObjectId.isValid(value)).withMessage("Invalid student ID")],
  validateRequest,
  async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) return res.status(404).json({ error: "Student not found" });

      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
);

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
