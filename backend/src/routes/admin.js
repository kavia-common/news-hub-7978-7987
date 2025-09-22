import express from 'express';
import multer from 'multer';
import { requireAdmin } from '../middleware/auth.js';
import NewsItem from '../models/NewsItem.js';
import { uploadImage } from '../storage/index.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// PUBLIC_INTERFACE
router.post('/news', requireAdmin, upload.single('image'), async (req, res) => {
  /**
   * Create a custom news item.
   * FormData fields: title, description, content, category, author, publishedAt?, image (file optional)
   */
  try {
    const { title, description = '', content = '', category = 'general', author = '' } = req.body || {};
    if (!title) return res.status(400).json({ message: 'Title is required' });

    let imageUrl = '';
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      imageUrl = await uploadImage(req.file.buffer, filename, req.file.mimetype);
    }

    const item = await NewsItem.create({
      title,
      description,
      content,
      category,
      author,
      imageUrl,
      isCustom: true,
      source: { name: 'Custom' }
    });

    res.status(201).json({ item });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create news item' });
  }
});

// PUBLIC_INTERFACE
router.put('/news/:id', requireAdmin, upload.single('image'), async (req, res) => {
  /** Update a custom news item by id. */
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      updates.imageUrl = await uploadImage(req.file.buffer, filename, req.file.mimetype);
    }

    const item = await NewsItem.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ item });
  } catch (e) {
    res.status(500).json({ message: 'Failed to update news item' });
  }
});

// PUBLIC_INTERFACE
router.delete('/news/:id', requireAdmin, async (req, res) => {
  /** Delete a custom news item by id. */
  try {
    const { id } = req.params;
    const out = await NewsItem.findByIdAndDelete(id);
    if (!out) return res.status(404).json({ message: 'Item not found' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete news item' });
  }
});

// PUBLIC_INTERFACE
router.get('/news', requireAdmin, async (req, res) => {
  /** List custom news with optional category filter. */
  try {
    const { category } = req.query;
    const items = await NewsItem.find(category ? { category } : {}).sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (e) {
    res.status(500).json({ message: 'Failed to list news items' });
  }
});

export default router;
