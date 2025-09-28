const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 10000,                    // ✅ Capital PORT
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://rohit99539953_db_user:U3xVYDKpZgapfpJD@cluster0.e8okq6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret', // ✅ Capital JWT_SECRET
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173', // ✅ Capital CORS_ORIGIN
  uploadDir: process.env.UPLOAD_DIR || './uploads',  // ✅ Capital UPLOAD_DIR
};