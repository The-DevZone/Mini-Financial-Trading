import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Portfolio from './pages/Portfolio';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminUsers from './pages/AdminUsers';
import AdminTransactions from './pages/AdminTransactions';

import { useLocation } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"]; // jaha navbar nahi chahiye

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/transactions" element={<ProtectedRoute><AdminTransactions /></ProtectedRoute>} />

        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}