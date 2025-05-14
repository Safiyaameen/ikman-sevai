const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple fake login logic
  if (username === 'admin' && password === '123') {
    res.send('<h2>Login successful!</h2><a href=\"/\">Go to Home</a>');
  } else {
    res.send('<h2>Login failed! Wrong username or password.</h2><a href=\"/login\">Try again</a>');
  }
});
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('users.json', (err, data) => {
    if (err) return res.send('Error reading user database.');

    const users = JSON.parse(data);
    const userExists = users.find(u => u.username === username);

    if (userExists) {
      return res.send('<h2>Username already exists.</h2><a href="/register">Try Again</a>');
    }

    users.push({ username, password });

    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) return res.send('Error saving new user.');
      res.send('<h2>Registration successful!</h2><a href="/login">Go to Login</a>');
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
app.get('/booking', (req, res) => {
  res.sendFile(__dirname + '/booking.html');
});
app.post('/book', (req, res) => {
  const { name, service, date, time } = req.body;

  fs.readFile('bookings.json', (err, data) => {
    if (err) return res.send('Error reading bookings file.');

    const bookings = JSON.parse(data);
    bookings.push({ name, service, date, time });

    fs.writeFile('bookings.json', JSON.stringify(bookings, null, 2), err => {
      if (err) return res.send('Error saving booking.');
      res.send('<h2>Booking Confirmed!</h2><a href="/">Go Home</a>');
    });
  });
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});
