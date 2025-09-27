const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const { jwtSecret } = require('../config');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

const router = express.Router();

function validatePan(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test((pan || '').toUpperCase());
}

router.post('/register', upload.single('idImage'), async (req, res) => {
  try {
    const { name, email, password, panNumber } = req.body;
    if (!name || !email || !password || !panNumber) return res.status(400).json({ success: false, message: 'Missing fields' });
    if (!validatePan(panNumber)) return res.status(400).json({ success: false, message: 'Invalid PAN format' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, passwordHash, panNumber: panNumber.toUpperCase(),
      kycIdImagePath: req.file ? req.file.path : undefined,
      kycStatus: 'APPROVED' // simplified for assignment
    });
    await Wallet.create({ user: user._id, balance: 100000 });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, kycStatus: user.kycStatus } }
    });
    console.log(token)

    
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing email/password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, kycStatus: user.kycStatus } } });

    console.log(token)
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;