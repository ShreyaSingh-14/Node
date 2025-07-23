const http = require('http');
http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end("Hello World\n");
}).listen(8080);
console.log("Server running at http://localhost:8080/");
// This code creates a simple HTTP server that listens on port 8080 and responds with "Hello World" when accessed.