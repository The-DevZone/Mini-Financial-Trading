const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { mongoUrl } = require('./src/config');
const Product = require('./src/models/Product');
const User = require('./src/models/User'); 
const Wallet = require('./src/models/Wallet'); 

(async () => {
  try {
    // DB connect
    await mongoose.connect(mongoUrl);

    // Products seed
    const products = [
      { name: 'TCS', category: 'STOCK', pricePerUnit: 3800, peRatio: 28.4, description: 'Top Indian IT services company' },
      { name: 'Reliance', category: 'STOCK', pricePerUnit: 2700, peRatio: 24.2, description: 'Largest private sector company in India' },
      { name: 'HDFC Bank', category: 'STOCK', pricePerUnit: 1600, peRatio: 21.3, description: 'Leading private bank' },
      { name: 'NIFTY 50 Index Fund', category: 'MUTUAL_FUND', pricePerUnit: 230, peRatio: 0, description: 'Low-cost NIFTY 50 index mutual fund' },
      { name: 'SBI Bluechip Fund', category: 'MUTUAL_FUND', pricePerUnit: 72, peRatio: 0, description: 'Large-cap mutual fund' },
    ];

    for (const p of products) {
      await Product.updateOne({ name: p.name }, { $set: p }, { upsert: true });
    }
    console.log('✅ Seeded products');

    // Admin user seed
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@gmail.com' },
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        passwordHash: hashedPassword,
        panNumber: 'ABCDE1234F',
        kycStatus: 'APPROVED',
        isAdmin: true
      },
      { upsert: true, new: true }
    );

    await Wallet.updateOne(
      { user: adminUser._id },
      { $set: { balance: 100000 } },
      { upsert: true }
    );

    console.log('✅ Admin user created:', adminUser.email);

    process.exit(0);
  } catch (e) {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  }
})();
