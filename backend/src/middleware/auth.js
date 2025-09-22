import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// PUBLIC_INTERFACE
export function requireAuth(req, res, next) {
  /** Verifies JWT and attaches req.user */
  try {
    const hdr = req.headers.authorization || '';
    const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// PUBLIC_INTERFACE
export function requireAdmin(req, res, next) {
  /** Requires JWT and admin role; fetches user to confirm role. */
  return requireAuth(req, res, async () => {
    try {
      const user = await User.findById(req.user.id).lean();
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    } catch (e) {
      return res.status(500).json({ message: 'Failed to verify admin' });
    }
  });
}
