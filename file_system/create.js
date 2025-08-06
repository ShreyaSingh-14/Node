const fs = require('fs');
const readline = require('readline');
const fileName = 'data.txt';

function createFile(content) {
    fs.writeFileSync(fileName, content);
    console.log('File created successfully!');
}

function readFile() {
    if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName, 'utf8');
        console.log('File Content:\n', data);
    } else {
        console.log('File does not exist!');
    }
}

function updateFile(newContent) {
    if (fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, newContent);
        console.log('File updated successfully!');
    } else {
        console.log('File does not exist!');
    }
}

function appendFile(content) {
    if (fs.existsSync(fileName)) {
        fs.appendFileSync(fileName, content);
        console.log('Content appended successfully!');
    } else {
        console.log('File does not exist!');
    }
}

function deleteFile() {
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log('File deleted successfully!');
    } else {
        console.log('File does not exist!');
    }
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log(`
Choose an operation:
1. Create File
2. Read File
3. Update File
4. Append to File
5. Delete File
`);

rl.question('Enter your choice (1-5): ', (choice) => {
    switch (parseInt(choice)) {
        case 1:
            rl.question('Enter content to write: ', (data) => {
                createFile(data);
                rl.close();
            });
            break;
        case 2:
            readFile();
            rl.close();
            break;
        case 3:
            rl.question('Enter new content to update: ', (data) => {
                updateFile(data);
                rl.close();
            });
            break;
        case 4:
            rl.question('Enter content to append: ', (data) => {
                appendFile(data);
                rl.close();
            });
            break;
        case 5:
            deleteFile();
            rl.close();
            break;
        default:
            console.log('⚠️ Invalid choice!');
            rl.close();
    }
});