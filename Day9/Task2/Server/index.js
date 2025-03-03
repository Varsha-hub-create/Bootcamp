const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://varshinisakthivel:varsh2005@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini";
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


// Student Schema & Model
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
});
const Student = mongoose.model("Student", studentSchema);

// Routes
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




