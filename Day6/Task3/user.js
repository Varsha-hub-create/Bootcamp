const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const USERS_FILE = "users.json";


app.use(express.json());
app.use(cors());


const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; 
  }
};


const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};


app.get("/", (req, res) => {
  res.send("Welcome to the API! Use GET, POST, PUT, DELETE on /users.");
});

app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const users = readUsers();
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

  const users = readUsers();
  const newUser = { id: users.length ? users[users.length - 1].id + 1 : 1, name };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added", user: newUser });
});


app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex].name = name;
  writeUsers(users);

  res.json({ message: "User updated", user: users[userIndex] });
});


app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const users = readUsers();
  const newUsers = users.filter((u) => u.id !== userId);

  if (users.length === newUsers.length) {
    return res.status(404).json({ error: "User not found" });
  }

  writeUsers(newUsers);
  res.json({ message: "User deleted" });
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
