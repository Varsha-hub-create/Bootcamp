const http = require("http");

http.createServer((req, res) => {
  const routes = {
    "/": "<h1>Home Page</h1>",
    "/about": "<h1>About Us</h1>",
    "/contact": "<h1>Contact Us</h1>",
  };
  
  res.writeHead(routes[req.url] ? 200 : 404, { "Content-Type": "text/html" });
  res.end(routes[req.url] || "<h1>404 Not Found</h1>");
}).listen(3000, () => console.log("Server running at http://localhost:3000/"));
