const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "users.json";

app.use(express.json());

const loadUsers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
};


app.get("/users", (req, res) => {
  try {
    const users = loadUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = loadUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/users", (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string")
      return res.status(400).json({ error: "Invalid input: Name is required and must be a string" });

    const users = loadUsers();
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: "User added", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name } = req.body;

    if (!name || typeof name !== "string")
      return res.status(400).json({ error: "Invalid input: Name is required and must be a string" });

    const users = loadUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    users[userIndex].name = name;
    saveUsers(users);

    res.json({ message: "User updated", user: users[userIndex] });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    let users = loadUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    users.splice(userIndex, 1);
    saveUsers(users);

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use((req, res) => res.status(404).json({ error: "Route not found" }));


app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
