const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001; // Using 3001 to avoid conflict if React app uses 3000

// In-memory store for users
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextId = 3; // To simulate auto-incrementing IDs

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('User CRUD API is running!');
});

// CRUD Routes for Users

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Retrieve all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Retrieve a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update a specific user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const { name, email } = req.body;
    // Only update fields that are provided
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a specific user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully', user: deletedUser[0] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// The existing app.get('/') route can be kept or removed.
// For now, let's keep it.
// app.get('/', (req, res) => {
//   res.send('User CRUD API is running!');
// });

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
