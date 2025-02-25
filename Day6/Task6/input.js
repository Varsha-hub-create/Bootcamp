const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = "users.json";

app.use(express.json());

const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; 
  }
};


const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};


app.post("/users", (req, res) => {
  const { name } = req.body;

 
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name is required and must be a string." });
  }

  if (name.length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long." });
  }


  const users = readUsers();

  if (users.some((user) => user.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: "User with this name already exists." });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added", user: newUser });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
