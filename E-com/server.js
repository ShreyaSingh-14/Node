// const http = require('http');
// http.createServer((req, res) => {
// res.writeHead(200, {'Content-Type': 'text/plain'});
// res.end("Hello World\n");
// }).listen(8080);
// console.log("Server running at http://localhost:8080/");
// // This code creates a simple HTTP server that listens on port 8080 and responds with "Hello World" when accessed.
const express=require('express');
const path=require("path");

const app=express();
//
const PORT=process.env.PORT|| 3000;
app.use(express.static(path.join(__dirname, 'Views')));

app.get('/', (req, res) => {
console.log(req)
});
//start the server
app.listen(PORT, () => {   
    console.log(`Server is running on http://localhost:${PORT}`);
    
    }
);
