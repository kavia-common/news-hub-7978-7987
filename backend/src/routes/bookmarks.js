import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// PUBLIC_INTERFACE
router.get('/', requireAuth, async (req, res) => {
  /** Returns all bookmarks for the current user. */
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ bookmarks: user.bookmarks || [] });
});

// PUBLIC_INTERFACE
router.post('/', requireAuth, async (req, res) => {
  /** Adds a new bookmark (idempotent by url). Body: { title, description, url, urlToImage, source, author, publishedAt } */
  const { article } = req.body || {};
  if (!article || !article.url) return res.status(400).json({ message: 'Article with url required' });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const exists = (user.bookmarks || []).some((a) => a.url === article.url);
  if (!exists) {
    user.bookmarks.unshift({
      title: article.title || '',
      description: article.description || '',
      url: article.url,
      urlToImage: article.urlToImage || '',
      source: { name: article.source?.name || 'Unknown' },
      author: article.author || '',
      publishedAt: article.publishedAt || new Date().toISOString()
    });
    await user.save();
  }
  res.status(201).json({ bookmarks: user.bookmarks });
});

// PUBLIC_INTERFACE
router.delete('/', requireAuth, async (req, res) => {
  /** Removes a bookmark by url. Body: { url } */
  const { url } = req.body || {};
  if (!url) return res.status(400).json({ message: 'url required' });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.bookmarks = (user.bookmarks || []).filter((a) => a.url !== url);
  await user.save();
  res.json({ bookmarks: user.bookmarks });
});

export default router;
