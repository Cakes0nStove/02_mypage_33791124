const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8000;

http.createServer(function (req, res) {
  const userAgent = req.headers['user-agent'];
  const isChrome = /Chrome/i.test(userAgent);

  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  console.log(` user-agent: ${userAgent}\n  Date & Time: ${timestamp}`);

  let filePath = "";

  if (req.url === '/' || req.url === '/index.html') {
    filePath = isChrome ? "HTML/chrome.html" : "HTML/webpage.html";
  } else {
    filePath = path.join(__dirname, req.url);
  }

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 - Forbidden");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".mp4": "video/mp4",
    ".gif": "image/gif",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}).listen(port, function () {
  console.log(`Node server is running on port ${port}...`);
});
