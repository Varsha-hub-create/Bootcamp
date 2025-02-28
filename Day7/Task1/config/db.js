require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
  mongoose.connect('mongodb+srv://varshinisakthivel:varsha12345@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));


// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true }
});

const Student = mongoose.model('Student', studentSchema);

// POST /students endpoint
app.post('/students', async (req, res) => {
  try {
    const { name, age, major, rollNo } = req.body;
    
    if (!name || !age || !major || !rollNo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = new Student({ name, age, major, rollNo });
    await student.save();
    
    res.status(201).json({ message: 'Student added successfully', studentId: student._id });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Roll No must be unique' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from DB
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;