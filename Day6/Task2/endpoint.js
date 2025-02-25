const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the API! Visit /users to get user data.");
});


app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
  ];
  res.json(users);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
