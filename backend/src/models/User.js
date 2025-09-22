import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user', index: true },
    bookmarks: [
      {
        // Store minimal fields of bookmarked items (could be external or custom)
        title: String,
        description: String,
        url: { type: String, index: true },
        urlToImage: String,
        source: { name: String },
        author: String,
        publishedAt: String
      }
    ]
  },
  { timestamps: true }
);

// Methods
UserSchema.methods.comparePassword = async function (raw) {
  return bcrypt.compare(raw, this.passwordHash);
};

// Static helper to create with hash
UserSchema.statics.createWithPassword = async function ({ email, password, role = 'user' }) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return this.create({ email, passwordHash, role });
};

const User = mongoose.model('User', UserSchema);
export default User;
