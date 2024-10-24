import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register
router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role } = req.body;
      
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({
        email,
        password,
        name,
        role: role || 'user'
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;