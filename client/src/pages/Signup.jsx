
import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

export default function Signup() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', panNumber: '', confirmPassword: '' });
  const [idImage, setIdImage] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (idImage) fd.append('idImage', idImage);

      const res = await api.post('/auth/register', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      login(res.data.data);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className='body-continer'>
      <div className="container">
        {/* Header */}
        <div className="header">
          <button
            onClick={() => nav(-1)}
            className="back-button"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2>Sign Up & KYC</h2>
        </div>

        <h1 className="form-title">Create Your Account</h1>
        <p className="form-subtitle">Join us to start your trading journey.</p>

        <form onSubmit={submit} className="space-y-4">
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="PAN Number"
              value={form.panNumber}
              onChange={(e) => setForm((f) => ({ ...f, panNumber: e.target.value }))}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              onChange={(e) => setIdImage(e.target.files[0])}
              id="file-upload"
              className="hidden"
            />
            <label htmlFor="file-upload" className="file-label">
              Upload ID Proof
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="login-link">Log in</Link>
            {/* <a href="/login" className="login-link">Log in</a> */}
          </p>
        </div>
      </div>
    </div>
  );
}