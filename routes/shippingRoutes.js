import express from 'express';
import ShippingAddress from '../models/ShippingAddress.js';
import authenticate from '../middleWare/authMiddleWare.js';

const router = express.Router();

// Route: POST /shipping
// Create a new shipping address
router.post('/', async (req, res) => {
  try {
    const newAddress = new ShippingAddress(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shipping address' });
  }
});

// Route: GET /shipping/:userId
// Get all shipping addresses for a user
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipping addresses' });
  }
});

// Route: PUT /shipping/:id
// Update a shipping address by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const address = await ShippingAddress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) {
      return res.status(404).json({ error: 'Shipping address not found' });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shipping address' });
  }
});

// Route: DELETE /shipping/:id
// Delete a shipping address by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const address = await ShippingAddress.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Shipping address not found' });
    }
    res.json({ message: 'Shipping address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shipping address' });
  }
});

export default router;
