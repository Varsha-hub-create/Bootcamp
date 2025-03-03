const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Student Schema & Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  major: { type: String, required: true },
  age: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);

// GET students with pagination
app.get("/students", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 6 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { rollNo: { $regex: search, $options: "i" } },
      ],
    };

    const totalStudents = await Student.countDocuments(query);
    const students = await Student.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json({
      students, // ✅ Changed from `data` to `students`
      totalStudents,
      totalPages: Math.ceil(totalStudents / limitNum),
    });
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

// POST a new student
app.post("/students", async (req, res) => {
  try {
    const { name, rollNo, major, age } = req.body;
    if (!name || !rollNo || !major || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = new Student({ name, rollNo, major, age });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent }); // ✅ Changed `data` to `student`
  } catch (error) {
    console.error("❌ Error adding student:", error);
    res.status(400).json({ message: "Error adding student", error: error.message });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
