import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// Route: GET /analytics/sales
// Fetch sales statistics
router.get('/sales', async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } },
    ]);

    const salesByMonth = await Order.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalSales: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ totalSales: totalSales[0].totalSales, salesByMonth });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales statistics' });
  }
});

// Route: GET /analytics/popularity
// Fetch product popularity
router.get('/popularity', async (req, res) => {
  try {
    const popularity = await Product.aggregate([
      { $project: { _id: 1, title: 1, numSold: { $size: '$orders' } } },
      { $sort: { numSold: -1 } },
    ]);

    res.json(popularity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product popularity' });
  }
});

// Route: GET /analytics/activity
// Fetch user activity
router.get('/activity', async (req, res) => {
  try {
    const userActivity = await User.aggregate([
      { $project: { _id: 1, name: 1, numOrders: { $size: '$orders' } } },
      { $sort: { numOrders: -1 } },
    ]);

    res.json(userActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activity' });
  }
});

export default router;
