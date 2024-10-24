import express from 'express';
import User from '../models/User.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.patch('/me', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    Object.assign(req.user, req.body);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add property to favorites
router.post('/favorites/:propertyId', auth, async (req, res) => {
  try {
    const user = req.user;
    const propertyId = req.params.propertyId;

    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove property from favorites
router.delete('/favorites/:propertyId', auth, async (req, res) => {
  try {
    const user = req.user;
    const propertyId = req.params.propertyId;

    user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;