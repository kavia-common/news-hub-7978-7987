import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Signup() {
  /** Placeholder signup page; backend integration to be wired later. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    alert('Signup not yet wired to backend. This is a placeholder.');
  };
  return (
    <div style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Create account</button>
      </form>
    </div>
  );
}
