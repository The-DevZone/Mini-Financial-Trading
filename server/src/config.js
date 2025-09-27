const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://rohit99539953_db_user:U3xVYDKpZgapfpJD@cluster0.e8okq6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  // redisUrl: process.env.REDIS_URL ||  'redis://127.0.0.1:6379',

  
};

