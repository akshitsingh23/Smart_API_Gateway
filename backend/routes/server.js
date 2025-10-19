const express = require('express');
const app = express();
const PORT = 5000;

// Dummy data
const users = [
  { id: 1, name: 'Akshit' },
  { id: 2, name: 'Riya' },
];

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
];

// Routes
app.get('/api/users', (req, res) => {
  console.log('Backend: /api/users requested');
  res.json(users);
});

app.get('/api/products', (req, res) => {
  console.log('Backend: /api/products requested');
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
