import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /**
   * Admin dashboard placeholder
   * - Create custom news with image (no backend wiring yet)
   * - Future: list/edit/delete items
   */
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [image, setImage] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    alert('Admin create news not yet wired to backend. This is a placeholder.');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {['general','business','entertainment','health','science','sports','technology','world','nation']
            .map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} />
        <button type="submit" className="btn">Create</button>
      </form>
      <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.7)' }}>
        Storage provider is configurable (Firebase or S3). Set STORAGE_PROVIDER in backend .env.
      </p>
    </div>
  );
}
