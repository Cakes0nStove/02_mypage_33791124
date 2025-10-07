const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8000;

http.createServer(function (req, res) {
  console.log(req.url);
  console.log(req.headers['user-agent']);
  const userAgent = req.headers['user-agent'];
  const isChrome = /Chrome/i.test(userAgent);
  let filePath;

  if(isChrome){
    filePath = "chrome.html"
  }else{
        filePath = req.url === "/" ? "webpage.html" : req.url.substring(1);
  }
  const ext = path.extname(filePath);

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
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

