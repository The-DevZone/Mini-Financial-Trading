const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./db');
const { port, corsOrigin } = require('./config');
const errorHandler = require('./middleware/error');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const txRoutes = require('./routes/transactions');
const portfolioRoutes = require('./routes/portfolio');
const watchlistRoutes = require('./routes/watchlist');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');

const app = express();

// ✅ STEP 1: SECURITY HEADERS
app.use(helmet());

// ✅ STEP 2: CORS — MUST BE BEFORE BODY PARSER & ROUTES
const allowedOrigins = corsOrigin ? corsOrigin.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ STEP 3: LOGGING
app.use(morgan('dev'));

// ✅ STEP 4: BODY PARSER — AFTER CORS!
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ✅ STEP 5: RATE LIMITER
app.use('/api/auth', rateLimit({ windowMs: 60 * 1000, max: 20 }));

// ✅ STEP 6: ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', txRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// ✅ HEALTH CHECK
app.get('/', (_, res) => res.json({ status: 'ok', service: 'mini-trader-api' }));

// ✅ ERROR HANDLER (last middleware)
app.use(errorHandler);

// ✅ START SERVER
connectDB().then(() => {
  app.listen(port, () => console.log(`API running on port ${port}`));
}).catch(err => {
  console.error("Database connection failed", err);
  process.exit(1);
});