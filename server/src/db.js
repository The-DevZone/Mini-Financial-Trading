const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUrl);
  console.log('MongoDB connected');
}
module.exports = connectDB;