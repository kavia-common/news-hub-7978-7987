import React from 'react';
import { isBookmarked } from '../utils/storage';

/**
 * ArticleCard renders a news article with actions.
 * Props:
 * - article: NewsAPI Article
 * - onBookmark(article): void
 */
export default function ArticleCard({ article, onBookmark }) {
  const {
    title,
    description,
    url,
    urlToImage,
    source,
    author,
    publishedAt,
  } = article;

  const bookmarked = isBookmarked(article);

  const shareText = encodeURIComponent(`${title} — via News Hub`);
  const shareUrl = encodeURIComponent(url);

  const openShare = (platform) => {
    const width = 600;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    let shareLink = '';
    if (platform === 'twitter') {
      shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
    } else if (platform === 'facebook') {
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    } else if (platform === 'linkedin') {
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    }
    window.open(shareLink, 'share', `width=${width},height=${height},left=${left},top=${top}`);
  };

  return (
    <article className="card">
      <div className="card-media">
        {urlToImage ? (
          <img src={urlToImage} alt={title} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(0,0,0,0.45))' }} />
        )}
      </div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-meta">
          <span>{source?.name || 'Unknown source'}</span>
          {author && <span>• {author}</span>}
          {publishedAt && <span>• {new Date(publishedAt).toLocaleString()}</span>}
        </div>
        {description && <div style={{ color: 'var(--color-text-dim)' }}>{description}</div>}
        <div className="card-actions">
          <a className="btn" href={url} target="_blank" rel="noreferrer">Read</a>
          <button
            className={`btn ${bookmarked ? 'btn-secondary' : ''}`}
            onClick={() => onBookmark(article)}
            aria-pressed={bookmarked}
          >
            {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
          <button className="btn" onClick={() => openShare('twitter')} aria-label="Share on Twitter">Share X</button>
          <button className="btn" onClick={() => openShare('facebook')} aria-label="Share on Facebook">Facebook</button>
          <button className="btn" onClick={() => openShare('linkedin')} aria-label="Share on LinkedIn">LinkedIn</button>
        </div>
      </div>
    </article>
  );
}
