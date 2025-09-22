const BASE_URL = process.env.REACT_APP_NEWS_API_BASE_URL || 'https://newsapi.org/v2';
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

/**
 * Simple wrapper for NewsAPI requests.
 * Note: On free plans, NewsAPI may block requests from the browser due to CORS.
 * This app attempts direct calls. If blocked, instruct using a simple proxy/dev setup.
 */

const headers = () => ({
  'X-Api-Key': API_KEY || '',
});

/**
 * Build query string from an object of params.
 */
function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      qs.set(k, v);
    }
  });
  return qs.toString();
}

/**
 * Fetch with error handling
 */
async function doFetch(path, params = {}) {
  if (!API_KEY) {
    throw new Error('Missing News API key. Please set REACT_APP_NEWS_API_KEY in your .env file.');
  }
  const query = buildQuery(params);
  const url = `${BASE_URL}${path}${query ? `?${query}` : ''}`;

  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    // Attempt to parse error payload
    let msg = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.message) msg = `${msg}: ${data.message}`;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  const data = await res.json();
  if (data.status !== 'ok') {
    throw new Error(data.message || 'Unknown error from NewsAPI');
  }
  return data;
}

// PUBLIC_INTERFACE
export async function fetchTopHeadlines({ country = 'us', category, page = 1, pageSize = 20 } = {}) {
  /** Fetches top headlines with optional category filter. */
  return doFetch('/top-headlines', { country, category, page, pageSize });
}

// PUBLIC_INTERFACE
export async function searchEverything({ q, language = 'en', sortBy = 'publishedAt', page = 1, pageSize = 20 } = {}) {
  /** Searches articles by keyword across many sources. */
  return doFetch('/everything', { q, language, sortBy, page, pageSize });
}

// PUBLIC_INTERFACE
export async function fetchCategory(category, { country = 'us', page = 1, pageSize = 20 } = {}) {
  /** Convenience method to fetch top headlines by a specific category. */
  return fetchTopHeadlines({ country, category, page, pageSize });
}
