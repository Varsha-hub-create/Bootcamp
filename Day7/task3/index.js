const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://varshinisakthivel:varsha12345@varshini.ahhhl.mongodb.net/?retryWrites=true&w=majority&appName=varshini")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    major: { type: String, required: true },
    rollNo: { type: Number, required: true, unique: true },
  });
  
  const Student = mongoose.model("Student", studentSchema);
  app.get('/students',async(req,res)=>{
    const student = await Student.find();
    res.status(201).json(student)
  })
  // ✅ Route to fetch a student by ID
  app.get("/students/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const student = await Student.findById(id)
      // ✅ Validate MongoDB ObjectId format
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });
  
  // ✅ Default route for testing
  app.get("/", (req, res) => {
    res.send("Welcome to the Student API!");
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
