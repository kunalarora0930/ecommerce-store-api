import express from 'express';
import Payment from '../models/Payment.js';
import authenticate from '../middleWare/authMiddleWare.js';

const router = express.Router();

// Route: POST /payments
// Create a new payment
router.post('/', authenticate, async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Route: GET /payments/:userId
// Get all payments for a user
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Route: GET /payments/:id
// Get a specific payment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

// Route: PUT /payments/:id
// Update a payment status by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

export default router;
