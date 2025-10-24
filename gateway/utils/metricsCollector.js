const metrics = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
};

function incrementRequest() {
  metrics.totalRequests++;
}

function incrementHit() {
  metrics.cacheHits++;
}

function incrementMiss() {
  metrics.cacheMisses++;
}

function getMetrics() {
  return { ...metrics };
}

module.exports = {
  incrementRequest,
  incrementHit,
  incrementMiss,
  getMetrics,
};
