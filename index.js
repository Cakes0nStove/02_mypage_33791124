const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8000;

http.createServer(function (req, res) {

  const userAgent = req.headers['user-agent'];
  const isChrome = /Chrome/i.test(userAgent);
  let filePath;

    if (req.url === '/' || req.url === '/index.html') {
    const userAgent = req.headers['user-agent'];
    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
    console.log(` user-agent: ${userAgent}\n  Date & Time: ${timestamp}`);
  }

  if(isChrome){
    filePath = "chrome.html"
  }else{
        filePath = req.url === "/" ? "index.html" : req.url.substring(1);
  }
  const ext = path.extname(filePath);
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
    ".mp4": "video/mp4",
    ".js": "application/javascript"
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File Not Found");
      return;
    }
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}).listen(port, function () {
  console.log(`Node server is running on port ${port}...`);
});

