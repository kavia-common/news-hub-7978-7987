import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import bookmarksRoutes from './routes/bookmarks.js';
import adminRoutes from './routes/admin.js';
import { notFound, errorHandler } from './utils/errors.js';

const app = express();

// App metadata and basic OpenAPI-style info (simplified)
/**
 * API: News Hub Backend
 * Summary: Provides JWT auth, aggregated news feed (external + custom), bookmarks, and admin custom news CRUD with image upload.
 * Version: 0.1.0
 */

// Security, CORS, Logging
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
app.use(limiter);

// Health check
// PUBLIC_INTERFACE
app.get('/api/health', (req, res) => {
  /** Returns service health status. */
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/admin', adminRoutes);

// Not found and error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect DB then start server
async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI not set. Please configure it in .env');
    }
    await mongoose.connect(MONGODB_URI, { autoIndex: true });
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`News Hub backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
