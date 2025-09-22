import express from 'express';
import fetch from 'node-fetch';
import NewsItem from '../models/NewsItem.js';

const router = express.Router();

const NEWS_API_BASE_URL = process.env.NEWS_API_BASE_URL || 'https://gnews.io/api/v4';
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

function normalizeGNewsArticle(a) {
  return {
    title: a.title,
    description: a.description,
    url: a.url,
    urlToImage: a.image || null,
    source: { name: a.source?.name || 'Unknown' },
    author: null,
    publishedAt: a.publishedAt,
    isCustom: false
  };
}

async function fetchExternalTop({ category, page = 1, max = 20 }) {
  if (!NEWS_API_KEY) {
    return { totalArticles: 0, articles: [] };
  }
  const qs = new URLSearchParams();
  if (category) qs.set('category', category);
  qs.set('lang', 'en');
  qs.set('page', String(page));
  qs.set('max', String(Math.min(Math.max(max, 1), 100)));
  qs.set('apikey', NEWS_API_KEY);
  const url = `${NEWS_API_BASE_URL}/top-headlines?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return { totalArticles: 0, articles: [] };
  const data = await res.json().catch(() => ({ totalArticles: 0, articles: [] }));
  data.articles = Array.isArray(data.articles) ? data.articles.map(normalizeGNewsArticle) : [];
  return data;
}

async function fetchExternalSearch({ q, page = 1, max = 20 }) {
  if (!NEWS_API_KEY) {
    return { totalArticles: 0, articles: [] };
  }
  const qs = new URLSearchParams();
  if (q) qs.set('q', q);
  qs.set('lang', 'en');
  qs.set('page', String(page));
  qs.set('max', String(Math.min(Math.max(max, 1), 100)));
  qs.set('apikey', NEWS_API_KEY);
  const url = `${NEWS_API_BASE_URL}/search?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return { totalArticles: 0, articles: [] };
  const data = await res.json().catch(() => ({ totalArticles: 0, articles: [] }));
  data.articles = Array.isArray(data.articles) ? data.articles.map(normalizeGNewsArticle) : [];
  return data;
}

// PUBLIC_INTERFACE
router.get('/top', async (req, res) => {
  /** Aggregated top: external + custom, supports category and pagination via page/max */
  try {
    const { category, page = 1, max = 20 } = req.query;
    const [ext, customItems] = await Promise.all([
      fetchExternalTop({ category, page: Number(page), max: Number(max) }),
      NewsItem.find(category ? { category } : {}).sort({ createdAt: -1 }).limit(50).lean()
    ]);

    const customArticles = customItems.map((a) => ({
      title: a.title,
      description: a.description,
      url: `custom://${a._id.toString()}`,
      urlToImage: a.imageUrl || null,
      source: { name: 'Custom' },
      author: a.author || null,
      publishedAt: a.publishedAt || a.createdAt?.toISOString?.() || new Date().toISOString(),
      isCustom: true,
      id: a._id.toString()
    }));

    const articles = [...customArticles, ...(ext.articles || [])];
    res.json({
      totalResults: (ext.totalArticles || 0) + customArticles.length,
      articles
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

// PUBLIC_INTERFACE
router.get('/search', async (req, res) => {
  /** Aggregated search: external + custom (title/description) */
  try {
    const { q = '', page = 1, max = 20 } = req.query;
    const [ext, customItems] = await Promise.all([
      fetchExternalSearch({ q, page: Number(page), max: Number(max) }),
      NewsItem.find({
        $or: [
          { title: new RegExp(q, 'i') },
          { description: new RegExp(q, 'i') },
          { content: new RegExp(q, 'i') }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean()
    ]);

    const customArticles = customItems.map((a) => ({
      title: a.title,
      description: a.description,
      url: `custom://${a._id.toString()}`,
      urlToImage: a.imageUrl || null,
      source: { name: 'Custom' },
      author: a.author || null,
      publishedAt: a.publishedAt || a.createdAt?.toISOString?.() || new Date().toISOString(),
      isCustom: true,
      id: a._id.toString()
    }));

    const articles = [...customArticles, ...(ext.articles || [])];
    res.json({
      totalResults: (ext.totalArticles || 0) + customArticles.length,
      articles
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to search news' });
  }
});

export default router;
