import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Core nav items (always visible)
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Watchlist', path: '/watchlist' },
  ];

  // If user is admin, push admin-only items
  if (user?.email === "admin@gmail.com") {
    navItems.push(
      { name: 'Admin Users', path: '/admin/users' },
      { name: 'Admin Txns', path: '/admin/transactions' }
    );
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        {/* <img src="/logo192.png" alt="Logo" />  */}
        Finance App
      </Link>

      {/* Hamburger Toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active-link' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="navbar-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <span style={{ margin: '0 6px', color: '#888' }}>|</span>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}