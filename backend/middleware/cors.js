require('dotenv').config();
const cors = require('cors');

// Simple CORS configuration that just works
const corsMiddleware = cors({
  origin: process.env.CLIENT_URL || true, // Allows current request origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
});

module.exports = corsMiddleware;