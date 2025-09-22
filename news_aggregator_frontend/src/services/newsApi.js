/**
 * GNews integration using a default API key (overridable via ENV).
 * Docs: https://gnews.io/docs/v4
 *
 * Default behavior:
 * - Uses provided default key for zero-config use.
 * - You can override with REACT_APP_GNEWS_API_KEY and REACT_APP_GNEWS_API_BASE_URL if desired.
 *
 * GNews article fields differ from NewsAPI; we normalize to:
 * - title
 * - description
 * - url
 * - urlToImage
 * - source: { name }
 * - author (GNews returns 'source.name' and may not include author; we'll set author to null)
 * - publishedAt
 */

const BASE_URL = process.env.REACT_APP_GNEWS_API_BASE_URL || 'https://gnews.io/api/v4';
// Default to provided key unless REACT_APP_GNEWS_API_KEY is set
const API_KEY = process.env.REACT_APP_GNEWS_API_KEY || '25e269348ded27d9bf00f28bfca0445a';

// Map our page/pageSize to GNews: uses page and max (1..100)
function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      qs.set(k, v);
    }
  });
  // Always include API key
  qs.set('apikey', API_KEY);
  return qs.toString();
}

async function doFetch(path, params = {}) {
  const query = buildQuery(params);
  const url = `${BASE_URL}${path}?${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    let msg = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && (data.message || data.errors)) {
        const details = data.message || (Array.isArray(data.errors) ? data.errors.join(', ') : '');
        msg = `${msg}: ${details}`;
      }
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  const data = await res.json();

  // GNews returns { totalArticles, articles: [...] }
  if (!data || !Array.isArray(data.articles)) {
    throw new Error('Unexpected response from news service');
  }
  return data;
}

// Normalize GNews article to our app shape
function normalizeArticle(a) {
  return {
    title: a.title,
    description: a.description,
    url: a.url,
    urlToImage: a.image || null,
    source: { name: a.source?.name || 'Unknown' },
    author: null,
    publishedAt: a.publishedAt,
  };
}

// PUBLIC_INTERFACE
export async function fetchTopHeadlines({ category, page = 1, pageSize = 20, language = 'en' } = {}) {
  /**
   * Fetch top headlines via GNews.
   * GNews supports categories: general, world, nation, business, technology, entertainment, sports, science, health
   * We pass category when provided; otherwise it'll return top headlines.
   */
  const max = Math.min(Math.max(pageSize || 20, 1), 100);
  const data = await doFetch('/top-headlines', {
    category,
    lang: language,
    page,
    max,
  });
  return {
    totalResults: data.totalArticles || 0,
    articles: data.articles.map(normalizeArticle),
  };
}

// PUBLIC_INTERFACE
export async function searchEverything({ q, language = 'en', page = 1, pageSize = 20 } = {}) {
  /** Keyword search across sources. */
  const max = Math.min(Math.max(pageSize || 20, 1), 100);
  const data = await doFetch('/search', {
    q,
    lang: language,
    page,
    max,
  });
  return {
    totalResults: data.totalArticles || 0,
    articles: data.articles.map(normalizeArticle),
  };
}

// PUBLIC_INTERFACE
export async function fetchCategory(category, { page = 1, pageSize = 20, language = 'en' } = {}) {
  /** Convenience wrapper using top-headlines with category. */
  return fetchTopHeadlines({ category, page, pageSize, language });
}
