import mongoose from 'mongoose';

const NewsItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    category: {
      type: String,
      enum: ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology', 'world', 'nation'],
      default: 'general',
      index: true
    },
    imageUrl: { type: String, default: '' },
    source: { name: { type: String, default: 'Custom' } },
    author: { type: String, default: '' },
    publishedAt: { type: String, default: () => new Date().toISOString() },
    isCustom: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const NewsItem = mongoose.model('NewsItem', NewsItemSchema);
export default NewsItem;
