const http = require('http');
http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end(`<!DOCTYPE html>
<html>
<head>
    <title>Node.js Example</title>  
</head>
<BODY>
    <h1>Welcome to Node.js Example</h1>
    <p>This is a simple HTML page served by a Node.js server.</p>
    <h2>This is my page</h2>
    <p>Here is some content for the page.</p>
    <p>Feel free to explore and modify the code!</p>
</BODY>
</html>`);
}).listen(8080);
console.log("Server running at http://localhost:8080/");
// This code creates a simple HTTP server that listens on port 8080 and responds with "Hello World" when accessed.
// project/
//  ├── controller/
//  │    └── mapController.js
//  ├── model/
//  │    └── addModel.js
//  ├── service/
//  │    └── addService.js
//  ├── route/
//  │    └── mapRoute.js
//  ├── app.js
//  └── server.js