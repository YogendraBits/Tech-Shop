// /backend/monitoring/metrics.js
import client from 'prom-client';

const register = new client.Registry();

// Create HTTP request counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Register the counter
register.registerMetric(httpRequestCounter);

// Middleware to track requests
export const trackRequest = (req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.originalUrl, status: res.statusCode });
  });
  next();
};

// Expose metrics for Prometheus
export const metricsRoute = (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
};
