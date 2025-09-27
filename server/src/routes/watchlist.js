const express = require('express');
const { auth } = require('../middleware/auth');
const Watchlist = require('../models/Watchlist');

const router = express.Router();

router.get('/', auth(true), async (req, res) => {
  try {
    const items = await Watchlist.find({ user: req.user.id }).populate('product');
    res.json({ success: true, data: items.map(i => i.product) });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch watchlist' });
  }
});

router.post('/', auth(true), async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'productId required' });
    await Watchlist.updateOne(
      { user: req.user.id, product: productId },
      { $setOnInsert: { user: req.user.id, product: productId } },
      { upsert: true }
    );
    res.status(201).json({ success: true, data: { added: true } });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to add to watchlist' });
  }
});

router.delete('/:productId', auth(true), async (req, res) => {
  try {
    await Watchlist.deleteOne({ user: req.user.id, product: req.params.productId });
    res.json({ success: true, data: { removed: true } });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to remove' });
  }
});

module.exports = router;