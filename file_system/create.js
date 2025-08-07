const http = require('http');
const fs = require('fs');

const fileName = 'data.txt';

function createFile(content) {
    fs.writeFileSync(fileName, content);
    return 'File created successfully!';
}

function readFile() {
    if (fs.existsSync(fileName)) {
        return fs.readFileSync(fileName, 'utf8');
    } else {
        return 'File does not exist!';
    }
}

function updateFile(newContent) {
    if (fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, newContent);
        return 'File updated successfully!';
    } else {
        return 'File does not exist!';
    }
}

function appendFile(content) {
    if (fs.existsSync(fileName)) {
        fs.appendFileSync(fileName, content);
        return 'Content appended successfully!';
    } else {
        return 'File does not exist!';
    }
}

function deleteFile() {
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        return 'File deleted successfully!';
    } else {
        return 'File does not exist!';
    }
}

http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // serve UI
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body>
                <h2>File System Operations</h2>
                <button onclick="fileOp('create')">Create</button>
                <button onclick="fileOp('read')">Read</button>
                <button onclick="fileOp('update')">Update</button>
                <button onclick="fileOp('append')">Append</button>
                <button onclick="fileOp('delete')">Delete</button>
                <pre id="result"></pre>
                <script>
                    function fileOp(op) {
                        let content = '';
                        if (op === 'create' || op === 'update' || op === 'append') {
                            content = prompt('Enter content:');
                        }
                        fetch('/' + op, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ content })
                        })
                        .then(res => res.text())
                        .then(data => document.getElementById('result').innerText = data);
                    }
                </script>
            </body>
            </html>
        `);
    }

    else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = body ? JSON.parse(body) : {};
            let result = '';

            if (req.url === '/create') result = createFile(data.content || '');
            else if (req.url === '/read') result = readFile();
            else if (req.url === '/update') result = updateFile(data.content || '');
            else if (req.url === '/append') result = appendFile(data.content || '');
            else if (req.url === '/delete') result = deleteFile();
            else result = 'Invalid operation.';
            res.end(result);
        });
    }

    else {
        res.writeHead(404);
        res.end('Not found');
    }

}).listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
