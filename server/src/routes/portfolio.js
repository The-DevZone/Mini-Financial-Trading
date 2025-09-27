const express = require('express');
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', auth(true), async (req, res) => {
  try {
    const userId = req.user.id;
    const txs = await Transaction.find({ user: userId, type: 'BUY' }).populate('product').sort({ createdAt: -1 });

    const map = new Map();
    for (const t of txs) {
      const key = String(t.product._id);
      if (!map.has(key)) map.set(key, { product: t.product, units: 0, invested: 0 });
      const h = map.get(key);
      h.units += t.units;
      h.invested += t.amount;
    }

    const holdings = Array.from(map.values()).map(h => {
      const currentValue = h.units * h.product.pricePerUnit;
      return {
        productId: h.product._id,
        name: h.product.name,
        category: h.product.category,
        units: h.units,
        invested: Math.round(h.invested * 100) / 100,
        currentValue: Math.round(currentValue * 100) / 100,
        returns: Math.round((currentValue - h.invested) * 100) / 100
      };
    });

    const summary = holdings.reduce((acc, h) => {
      acc.totalInvested += h.invested;
      acc.totalCurrentValue += h.currentValue;
      return acc;
    }, { totalInvested: 0, totalCurrentValue: 0 });

    const totalReturns = Math.round((summary.totalCurrentValue - summary.totalInvested) * 100) / 100;

    res.json({ success: true, data: { summary: { ...summary, totalReturns }, holdings } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Failed to fetch portfolio' });
  }
});

module.exports = router;