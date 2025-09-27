const express = require('express');
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.post('/buy', auth(true), async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, units } = req.body;
    const u = Number(units);
    if (!productId || !u || u <= 0) return res.status(400).json({ success: false, message: 'Invalid input' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const amount = product.pricePerUnit * u;

    // Atomic wallet deduction using conditional update
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!wallet) return res.status(400).json({ success: false, message: 'Insufficient balance' });

    try {
      const tr = await Transaction.create({
        user: userId,
        product: product._id,
        type: 'BUY',
        units: u,
        pricePerUnit: product.pricePerUnit,
        amount
      });
      return res.status(201).json({ success: true, data: { transaction: tr, newBalance: wallet.balance } });
    } catch (e) {
      // rollback wallet if tx creation fails
      await Wallet.updateOne({ user: userId }, { $inc: { balance: amount } });
      throw e;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Purchase failed' });
  }
});

module.exports = router;