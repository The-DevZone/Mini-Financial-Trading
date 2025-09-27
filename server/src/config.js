const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/minitrader',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  // redisUrl: process.env.REDIS_URL ||  'redis://127.0.0.1:6379',
};