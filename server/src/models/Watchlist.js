const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', index: true },
}, { timestamps: true });

watchlistSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);