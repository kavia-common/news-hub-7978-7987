import React from 'react';

export default function Footer() {
  const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;
  return (
    <footer className="app-footer">
      <div style={{ fontWeight: 800 }}>© {new Date().getFullYear()} News Hub</div>
      <div className="footer-links" aria-label="Social links">
        <a className="link-pill" href={`${siteUrl}`} target="_blank" rel="noreferrer">Website</a>
        <a className="link-pill" href="https://twitter.com/intent/tweet?text=Reading%20news%20on%20News%20Hub" target="_blank" rel="noreferrer">Share on X</a>
        <a className="link-pill" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </footer>
  );
}
