const express = require('express');
const { auth, requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Admin: View all users
router.get('/users', auth(true), requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-passwordHash').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Admin: View all transactions
router.get('/transactions', auth(true), requireAdmin, async (req, res) => {
  try {
    const txs = await Transaction.find()
      .populate('user', 'name email')
      .populate('product', 'name pricePerUnit')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: txs });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

module.exports = router;