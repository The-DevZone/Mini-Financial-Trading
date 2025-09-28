const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.port || 3300,
  mongoUrl: process.env.mongoUrl || 'mongodb+srv://rohit99539953_db_user:U3xVYDKpZgapfpJD@cluster0.e8okq6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  jwtSecret: process.env.jwtSecret || 'dev_secret',
  corsOrigin: process.env.corsOrigin || 'http://localhost:5173',
  uploadDir: process.env.uploadDir || './uploads',
  // redisUrl: process.env.REDIS_URL ||  'redis://127.0.0.1:6379',

  
};

