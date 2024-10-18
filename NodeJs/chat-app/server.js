const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to safely read the JSON file
function readMessagesFile() {
    const filePath = path.join(__dirname, 'messages.json');
    
    // Check if the file exists and is not empty
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(fileContent || '[]');  // If the file is empty, use an empty array
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];  // Return empty array if there's a parsing error
        }
    } else {
        return [];  // Return empty array if file doesn't exist
    }
}

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        res.redirect('/?username=' + username);
    } else {
        res.redirect('/login');
    }
});

// Serve the chat page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle message submission and store messages in messages.json
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;

    if (username && message) {
        const filePath = path.join(__dirname, 'messages.json');
        const messages = readMessagesFile();  // Read the messages safely

        messages.push({ username, message });
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));  // Write messages to file

        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Username and message required' });
    }
});

// API to get all messages
app.get('/messages', (req, res) => {
    const messages = readMessagesFile();  // Read messages safely
    res.json(messages);
});

// Initialize message file if not exists
const initMessagesFile = () => {
    const filePath = path.join(__dirname, 'messages.json');
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');  // Initialize with an empty array
    }
};
initMessagesFile();  // Ensure the file is initialized

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
