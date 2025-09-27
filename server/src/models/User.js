const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  panNumber: { type: String, required: true },
  kycIdImagePath: { type: String },
  kycStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);