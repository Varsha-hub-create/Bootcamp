const fs = require("fs").promises;

fs.readFile("input.txt", "utf8")
  .then(data => fs.writeFile("output.txt", data.toUpperCase()))
  .then(() => console.log("Processing complete."))
  .catch(err => console.error("Error:", err.message));
