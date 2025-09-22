import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Bookmarks from './pages/Bookmarks';
import AdminDashboard from './pages/AdminDashboard';

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(31,41,55,0.35)' }}>
      <Link to="/" className="link-pill">Home</Link>
      <Link to="/login" className="link-pill">Login</Link>
      <Link to="/signup" className="link-pill">Signup</Link>
      <Link to="/bookmarks" className="link-pill">Bookmarks</Link>
      <Link to="/admin" className="link-pill">Admin</Link>
    </nav>
  );
}

// PUBLIC_INTERFACE
export default function RootRouter() {
  /** Router wrapper that exposes routes for core pages. */
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
