const fs = require("fs");

fs.stat(process.argv[2], (err, stats) => {
  if (err) return console.error("Error:", err.message);
  console.log(`Size: ${stats.size} bytes\nCreated: ${stats.birthtime}\nModified: ${stats.mtime}`);
});
