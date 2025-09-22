const KEY = 'news_hub_bookmarks_v1';

// PUBLIC_INTERFACE
export function getBookmarks() {
  /** Returns bookmarked articles array from localStorage (safe). */
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveBookmarks(items) {
  /** Persists an array of bookmarked articles to localStorage. */
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore quota or serialization errors
  }
}

// PUBLIC_INTERFACE
export function isBookmarked(article) {
  /** Checks if an article is already bookmarked based on URL. */
  const bookmarks = getBookmarks();
  return bookmarks.some((a) => a.url === article.url);
}

// PUBLIC_INTERFACE
export function toggleBookmark(article) {
  /** Adds/removes a bookmark; returns the updated list and state. */
  const bookmarks = getBookmarks();
  const idx = bookmarks.findIndex((a) => a.url === article.url);
  let added = false;
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    // Store minimal fields necessary
    const { title, description, url, urlToImage, source, author, publishedAt } = article;
    bookmarks.unshift({ title, description, url, urlToImage, source, author, publishedAt });
    added = true;
  }
  saveBookmarks(bookmarks);
  return { bookmarks, added };
}
