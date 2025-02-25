const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


let users = [
  { id: 1, name: "Varsh" },
  { id: 2, name: "Harsh" }
];


app.get("/", (req, res) => {
  res.send("Welcome to the API! Use /users or /users/:id for user data.");
});


app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newUser = { id: users.length + 1, name };
  users.push(newUser);

  res.status(201).json({ message: "User added", user: newUser });
});


app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  user.name = name;
  res.json({ message: "User updated", user });
});
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});


app.use((req, res) => res.status(404).json({ error: "Route not found" }));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
