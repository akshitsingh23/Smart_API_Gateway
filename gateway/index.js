const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

// Simple in-memory cache stub
const cache = {}; // key: URL, value: response

// Forward requests to backend
app.use('/api/*', async (req, res) => {
  const url = `http://localhost:5000${req.originalUrl}`;

  // Check cache first
  if (cache[url]) {
    console.log('Cache hit:', url);
    return res.json(cache[url]);
  }

  try {
    console.log('Cache miss:', url);
    const response = await axios.get(url);

    // Store in cache (basic stub)
    cache[url] = response.data;

    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(500).json({ error: 'Backend request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway server running on http://localhost:${PORT}`);
});
