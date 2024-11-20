const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static('public'));

// View engine for admin page
app.set('view engine', 'ejs');

// Store messages in memory (or use a database)
const messages = [];

// Home route (for testing)
app.get('/', (req, res) => {
    res.send('Node.js Server is running!');
});

// Route to handle form submissions
app.post('/submit-message', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Store message
    messages.push({ name, email, subject, message });

    // Save to file (optional)
    const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;
    fs.appendFileSync('messages.txt', data);

    res.send('Message submitted successfully!');
});

// Admin login route
app.get('/admin', (req, res) => {
    if (req.session.adminLoggedIn) {
        res.redirect('/admin/messages');
    } else {
        res.render('login', { error: null });
    }
});

app.post('/admin', (req, res) => {
    const { username, password } = req.body;

    // Replace with your admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'password123';

    if (username === adminUsername && password === adminPassword) {
        req.session.adminLoggedIn = true;
        res.redirect('/admin/messages');
    } else {
        res.render('login', { error: 'Invalid credentials!' });
    }
});

// Admin messages route
app.get('/admin/messages', (req, res) => {
    if (!req.session.adminLoggedIn) {
        return res.redirect('/admin');
    }
    res.render('messages', { messages });
});

// Admin logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

// Set EJS as view engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');}