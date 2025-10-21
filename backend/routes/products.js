const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
];

router.get('/', (req, res) => res.json(products));

module.exports = router;
