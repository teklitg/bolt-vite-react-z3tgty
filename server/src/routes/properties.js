import express from 'express';
import { body, validationResult } from 'express-validator';
import Property from '../models/Property.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.minPrice) filters.price = { $gte: req.query.minPrice };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: req.query.maxPrice };
    if (req.query.bedrooms) filters.bedrooms = { $gte: req.query.bedrooms };
    if (req.query.location) filters.location = new RegExp(req.query.location, 'i');

    const properties = await Property.find(filters).populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property (landlords only)
router.post('/',
  [
    auth,
    checkRole(['landlord', 'admin']),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').isNumeric(),
    body('location').notEmpty(),
    body('bedrooms').isNumeric(),
    body('bathrooms').isNumeric(),
    body('area').isNumeric(),
    body('imageUrl').isURL()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const property = new Property({
        ...req.body,
        owner: req.user._id
      });

      await property.save();
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update property
router.patch('/:id',
  auth,
  async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }

      if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      Object.assign(property, req.body);
      await property.save();
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete property
router.delete('/:id',
  auth,
  async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }

      if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      await property.deleteOne();
      res.json({ message: 'Property deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;