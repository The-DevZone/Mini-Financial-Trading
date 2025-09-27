const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true, index: true },
  category: { type: String }, // STOCK | MUTUAL_FUND
  pricePerUnit: { type: Number, required: true },
  peRatio: { type: Number, default: 0 },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);