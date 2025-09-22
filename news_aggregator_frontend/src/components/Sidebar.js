import React from 'react';

const CATEGORIES = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

// PUBLIC_INTERFACE
export default function Sidebar({ current, onSelect }) {
  /** Sidebar with selectable categories. */
  return (
    <aside className="app-sidebar">
      <div className="sidebar-card">
        <div className="sidebar-title">Categories</div>
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={`category-item ${current === cat ? 'active' : ''}`}
              onClick={() => onSelect(cat)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(cat)}
              role="button"
              tabIndex={0}
              aria-pressed={current === cat}
              aria-label={`Filter by ${cat}`}
            >
              <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{cat}</span>
              {current === cat ? <span className="badge primary">Active</span> : <span className="badge">View</span>}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
