const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const successRoute = require('../routes/success')
const contactRoute = require('../routes/contact')
const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to safely read the JSON file
function readMessagesFile() {
    const filePath = path.join(__dirname, 'messages.json');
    
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(fileContent || '[]');
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    } else {
        return [];
    }
}

// Handle GET requests to the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Handle login and redirect to the chat page
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
    const username = req.query.username;
    res.render('index', { username });
});

// Handle sending chat messages
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    const filePath = path.join(__dirname, 'messages.json');
    const messages = readMessagesFile();

    messages.push({ username, message });
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.json({ success: true });
});

// API to get all messages
app.get('/messages', (req, res) => {
    const messages = readMessagesFile();
    res.json(messages);
});

// Contact Us page route
app.use('/contact',contactRoute);

// Handle Contact Us form submission
app.post('/contactus', (req, res) => {
    // You can handle storing the form data here if needed
    res.redirect('/success');
});

// Success page route
  app.use('/success',successRoute)

// Handle 404 - Page Not Found
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
