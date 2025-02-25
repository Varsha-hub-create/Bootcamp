const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors()); 


const users = [
  { id: 1, name: "Varshu" },
  { id: 2, name: "Harshu" }
];


app.get("/", (req, res) => {
  res.send("Welcome to the API! Visit /users to get user data or use POST /users to add a user.");
});


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10); 
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1, 
    name
  };

  users.push(newUser); 

  res.status(201).json({ message: "User added", user: newUser });
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
