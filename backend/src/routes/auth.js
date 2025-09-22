import express from 'express';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @summary Register a new user or admin
 * @body { email, password, role? }
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const user = await User.createWithPassword({ email, password, role: role === 'admin' ? 'admin' : 'user' });
    const token = signToken({ id: user._id.toString(), role: user.role, email: user.email });
    res.status(201).json({
      token,
      user: { id: user._id.toString(), email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

/**
 * @route POST /api/auth/login
 * @summary Login and receive JWT
 * @body { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken({ id: user._id.toString(), role: user.role, email: user.email });
    res.json({
      token,
      user: { id: user._id.toString(), email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to login' });
  }
});

export default router;
