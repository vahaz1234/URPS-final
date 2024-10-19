require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');


const app = express();
console.log(process.env.AUTH_SERVICE_URL)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Check for environment variables
// if (!process.env.AUTH_SERVICE_URL) {
//   throw new Error('AUTH_SERVICE_URL is not defined');
// }

// Proxy middleware
const createProxyMiddleware = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      console.log(`Proxying ${req.method} request to ${serviceUrl}${req.url}`);
      return req.url;
    },
    proxyErrorHandler: (err, res, next) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy Error');
    }
  });
};

// Routes
app.use('/auth', createProxyMiddleware("http://localhost:5001"));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
