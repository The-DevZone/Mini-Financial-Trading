import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.data);
      nav('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <button 
          className="back-button" 
          onClick={() => nav(-1)}
          >
            <svg className="back-icon" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="login-title">Login</h2>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to continue your journey</p>

        <form onSubmit={submit} className="login-form">
          <input
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            className="form-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <div className="signup-link">
          Don’t have an account? <Link to="/signup" className='cursor-pointer'>Signup</Link>
        </div>
      </div>
    </div>
  );
}