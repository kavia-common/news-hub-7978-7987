import React, { useState } from 'react';

/**
 * Header with brand and search.
 * Props:
 * - onSearch(query: string): void
 * - onShowBookmarks(): void
 */
export default function Header({ onSearch, onShowBookmarks }) {
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-badge" aria-hidden="true" />
        <div>
          <div className="brand-title">News Hub</div>
          <div className="brand-sub">Ocean Professional</div>
        </div>
      </div>

      <form className="search-wrap" onSubmit={submit} role="search">
        <input
          aria-label="Search news"
          className="search-input"
          value={query}
          placeholder="Search top headlines, topics, people…"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit">Search</button>
        <button className="btn btn-secondary" type="button" onClick={onShowBookmarks}>
          ★ Bookmarks
        </button>
      </form>
    </header>
  );
}
