

# 📈 Mini Financial Trading App



**A full-stack mini trading platform built with Node.js, Express, MongoDB, React (Vite), Tailwind CSS, Recharts and JWT authentication. Includes KYC with file upload, product listing with details/charts, buy transactions, portfolio analytics, wallet balance, and watchlist. Optional bonus features include   Admin panel (view users and transactions).**

## 🎯 Overview

**Key Technologies Used:**
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer
- **Frontend:** React, Vite, React Query, Recharts, Tailwind CSS , external css.

---

## ✨ Core Features Implemented

| Feature | Backend Component | Frontend Component | Notes |
|:---|:---|:---|:---|
| **Authentication** | `auth.js` | `Login.jsx`, `Signup.jsx` | JWT Security |
| **KYC** | `User.model`, `upload.js` | `Signup.jsx` | File upload simulation handled by Multer |
| **Product Listing** | `products.js` | `Products.jsx`|
| **Transactions** | `transactions.js` | `ProductDetail.jsx` | Atomic update on Wallet |
| **Portfolio** | `portfolio.js` | `Dashboard.jsx`, `Portfolio.jsx` | Calculates invested, current value, returns |
| **Watchlist** | `watchlist.js` | `Watchlist.jsx` | Add/Remove functionality |
| **Admin Panel** | `admin.js` (New Route) | `AdminUsers.jsx`, `AdminTransactions.jsx` (New Pages) | Role-based access (`isAdmin: true`) |

---

## 🛠️ Tech Stack Details

| Layer | Technology | Key Libraries |
|:---|:---|:---|
| **Backend** | Node.js / Express | Mongoose, JWT, Multer, Helmet, |
| **Frontend** | React / Vite | React Query, React Router, Recharts |
| **Database** | MongoDB | Mongoose Models |
| **UI/UX** | Custom Responsive UI | Tailwind CSS | External CSS |

---

## 📦 Installation & Setup

The project is structured with separate `backend` and `frontend` directories.

### Prerequisites
1. Node.js (v18+) and npm installed.
2. MongoDB running locally or a connection string for Atlas/cloud provider.


### 1. Clone & Navigate
```bash
git clone https://github.com/The-DevZone/Mini-Financial-Trading.git
cd mini-trader
```

### 2. Backend Setup (API Server)
```bash
cd backend
npm install

# 1. Configure .env file (Required)
# Create backend/.env and set MONGO_URL, JWT_SECRET, etc.

# 2. Seed Database (Products and initial Wallet)
npm run seed

# 3. Start Server
npm run dev
# Server runs on http://localhost:3300
```

### 3. Frontend Setup (React Client)
```bash
cd ../frontend
npm install

# Configure API URL in frontend/.env
# Ensure VITE_API_URL points to your backend URL (e.g., http://localhost:3300)

# Start Client
npm run dev
# App runs on http://localhost:5173
```

---

## 📊 API Documentation

All endpoints (except Auth) are secured using **JWT** in the `Authorization: Bearer <token>` header.

| Category | Endpoint | Method | Request Body | Response Data |
|:---|:---|:---|:---|:---|
| **Auth** | `/api/auth/register` | POST | Multipart Form (KYC data + `idImage`) | `{token, user}` |
| **Auth** | `/api/auth/login` | POST | `{email, password}` | `{token, user}` |
| **Products** | `/api/products` | GET | None | `[{product data}]`  |
| **Trading** | `/api/transactions/buy` | POST | `{productId, units}` | `{transaction, newBalance}` |
| **Portfolio** | `/api/portfolio` | GET | None | `{summary, holdings}` |
| **Watchlist** | `/api/watchlist` | GET/POST/DELETE | Varies | List of Product objects |
| **Admin** | `/api/admin/users` | GET | None | List of Users (Admin Only) |
| **Admin** | `/api/admin/transactions` | GET | None | List of Transactions (Admin Only) |

---

## 📹 Demo Video Walkthrough

🔗 **[WATCH DEMO VIDEO HERE (3-5 Mins)](https://drive.google.com/your-demo-video-link)**

**Key Demo Points:**
1. **Signup:** Demonstrate KYC upload (shows file handling).
2. **Wallet Check:** Show the initial ₹100,000 balance on the Dashboard.
3. **Transaction:** Buy units of a product, watch the wallet decrease.
4. **Portfolio:** Show calculated Returns and Holdings correctly updated.
6. **Admin Access:** Log in as **`admin@gmail.com`** (`admin123`) and navigate to the **Admin Panel** to prove role-based access and data visibility.

---

## 💻 Project Structure (Reflecting Image)

```
mini-trader/
├── 📁 backend/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   ├── 📁 uploads/              # KYC Images
│   └── 📁 src/
│       ├── server.js            # Main Express App
│       ├── db.js
│       ├── config.js
│       ├── 📁 middleware/        # auth.js, upload.js, error.js
│       ├── 📁 models/            # User.js, Product.js, Wallet.js, Transaction.js, Watchlist.js
│       └── 📁 routes/            # auth.js, products.js, portfolio.js, admin.js (BONUS)
│
└── 📁 frontend/
    ├── .env
    ├── package.json
    ├── vite.config.js
    └── 📁 src/
        ├── App.jsx
        ├── main.jsx
        ├── api/client.js
        ├── context/AuthContext.jsx
        ├── components/              # NavBar.jsx, ProtectedRoute.jsx
        └── 📁 pages/                # All feature pages + AdminUsers.jsx, AdminTransactions.jsx
```

---

## ⚖️ Security & Quality Assurance

- **Security:** JWT used for session management. All sensitive data (passwords) are hashed. Rate limiting implemented on Auth routes.
- **Code Quality:** Modular structure, clear separation of concerns (Routes, Models, Middleware).
- **UX:** responsive layout using Tailwind CSS breakpoints and External CSS.

---

<div align="center">

### Thank You for Reviewing My Submission!

This project successfully meets all core requirements while incorporating best practices for a modern, scalable application.

**Rohit** | **rohit995379@gmail.com** | **[LinkedIn Profile](https://www.linkedin.com/in/rohit-verma-b07ba3242/)**

</div>
