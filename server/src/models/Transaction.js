const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  type: { type: String, enum: ['BUY'], default: 'BUY' },
  units: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);