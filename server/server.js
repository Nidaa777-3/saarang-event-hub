const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'saarang_jwt_super_secret_key_12345';
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    return { users: [], registrations: [], events: [] };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing DB:', error);
  }
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Endpoint: Sign Up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Please provide email, password, and name' });
  }

  const db = readDB();

  // Check if user already exists
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    };

    db.users.push(newUser);
    writeDB(db);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Endpoint: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  const db = readDB();

  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Endpoint: Get Events
app.get('/api/events', (req, res) => {
  const db = readDB();
  res.json(db.events);
});

// Endpoint: Get User Registrations
app.get('/api/registrations', authenticateToken, (req, res) => {
  const db = readDB();
  const userRegistrations = db.registrations
    .filter(r => r.userId === req.user.id)
    .map(r => r.eventId);
  res.json(userRegistrations);
});

// Endpoint: Toggle Registration
app.post('/api/registrations/toggle', authenticateToken, (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res.status(400).json({ error: 'eventId is required' });
  }

  const db = readDB();

  // Validate event exists
  const eventExists = db.events.some(e => e.id === eventId.toString());
  if (!eventExists) {
    return res.status(400).json({ error: 'Event not found' });
  }

  const userId = req.user.id;
  const index = db.registrations.findIndex(r => r.userId === userId && r.eventId === eventId.toString());

  let registered = false;
  if (index === -1) {
    // Add registration
    db.registrations.push({
      id: Date.now().toString(),
      userId,
      eventId: eventId.toString()
    });
    registered = true;
  } else {
    // Remove registration
    db.registrations.splice(index, 1);
  }

  writeDB(db);
  res.json({ success: true, registered });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Saarang API Backend running on http://localhost:${PORT}`);
});
