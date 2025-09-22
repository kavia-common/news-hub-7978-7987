import React from 'react';
import { getBookmarks } from '../utils/storage';

// PUBLIC_INTERFACE
export default function Bookmarks() {
  /** Placeholder bookmarks page (localStorage-based for now). */
  const items = getBookmarks();
  return (
    <div style={{ padding: 24 }}>
      <h1>My Bookmarks</h1>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#0b1220', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)' }}>
        {JSON.stringify(items, null, 2)}
      </pre>
      <div>Note: This will later use backend per-user bookmarks.</div>
    </div>
  );
}
