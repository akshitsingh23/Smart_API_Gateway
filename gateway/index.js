const express = require('express');
const axios = require('axios');
const { LRUCache } = require('./middleware/cacheManager');
const { logRequest } = require('./middleware/logger');
const metrics = require('./utils/metricsCollector');

const app = express();
const PORT = 4000;

const cache = new LRUCache(5);

// Log every request
app.use(logRequest);

// Forward requests
app.use('/api/*', async (req, res) => {
  metrics.incrementRequest();
  const url = `http://localhost:5000${req.originalUrl}`;

  if (cache.get(url)) {
    console.log('Cache hit:', url);
    metrics.incrementHit();
    return res.json(cache.get(url));
  }

  try {
    console.log('Cache miss:', url);
    metrics.incrementMiss();

    const response = await axios.get(url);
    cache.set(url, response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(500).json({ error: 'Backend request failed' });
  }
});

// Endpoint to view metrics
app.get('/metrics', (req, res) => {
  res.json(metrics.getMetrics());
});

app.listen(PORT, () => {
  console.log(`Gateway server running on http://localhost:${PORT}`);
});
