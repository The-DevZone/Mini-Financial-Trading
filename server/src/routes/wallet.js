const express = require('express');
const { auth } = require('../middleware/auth');
const Wallet = require('../models/Wallet');

const router = express.Router();

router.get('/', auth(true), async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    res.json({ success: true, data: { balance: wallet?.balance ?? 0 } });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch wallet' });
  }
});

module.exports = router;