const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, index: true },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);