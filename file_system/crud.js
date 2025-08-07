const http = require('http');
const fs = require('fs');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const fileName = 'data.txt';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/' && method === 'GET') {
        // Serve HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>File System UI</title></head>
            <body>
                <h1>File System CRUD</h1>
                <button onclick="createFile()">Create File</button>
                <button onclick="readFile()">Read File</button>
                <button onclick="updateFile()">Update File</button>
                <button onclick="appendFile()">Append File</button>
                <button onclick="deleteFile()">Delete File</button>
                <pre id="output"></pre>

                <script>
                    async function request(op, method = 'POST', body = null) {
                        const res = await fetch('/' + op, {
                            method,
                            headers: { 'Content-Type': 'application/json' },
                            body: body ? JSON.stringify({ content: body }) : null
                        });
                        const data = await res.text();
                        document.getElementById('output').innerText = data;
                    }

                    function createFile() {
                        const content = prompt("Enter content to write:");
                        request('create', 'POST', content);
                    }

                    function readFile() {
                        request('read', 'GET');
                    }

                    function updateFile() {
                        const content = prompt("Enter new content:");
                        request('update', 'PUT', content);
                    }

                    function appendFile() {
                        const content = prompt("Enter content to append:");
                        request('append', 'PATCH', content);
                    }

                    function deleteFile() {
                        request('delete', 'DELETE');
                    }
                </script>
            </body>
            </html>
        `);
    }

    else if (path === '/create' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { content } = JSON.parse(body);
            fs.writeFileSync(fileName, content);
            res.end('✅ File created.');
        });
    }

    else if (path === '/read' && method === 'GET') {
        if (fs.existsSync(fileName)) {
            const data = fs.readFileSync(fileName, 'utf8');
            res.end(data);
        } else {
            res.end('⚠️ File not found.');
        }
    }

    else if (path === '/update' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { content } = JSON.parse(body);
            fs.writeFileSync(fileName, content);
            res.end('✅ File updated.');
        });
    }

    else if (path === '/append' && method === 'PATCH') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { content } = JSON.parse(body);
            fs.appendFileSync(fileName, content);
            res.end('Content appended.');
        });
    }

    else if (path === '/delete' && method === 'DELETE') {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
            res.end('File deleted.');
        } else {
            res.end('⚠️ File does not exist.');
        }
    }

    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(8080, () => {
    console.log('server running at http://localhost:8080');
});
