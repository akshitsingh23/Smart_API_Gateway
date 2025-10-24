function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

module.exports = { log };
const express = require('express');
const router = express.Router();
const { log } = require('../utils/logger');
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
];
router.get('/', (req, res) => {
  log('Fetching all products');
  res.json(products);
});