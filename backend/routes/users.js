const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Akshit' },
  { id: 2, name: 'Riya' },
];

router.get('/', (req, res) => res.json(users));

module.exports = router;
