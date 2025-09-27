const express = require('express');
const Product = require('../models/Product');
const cache = require('../cache'); // <-- NEW

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    res.json({ success: true, data: products });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: product });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

module.exports = router;
