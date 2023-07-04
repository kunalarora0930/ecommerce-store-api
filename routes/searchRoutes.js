import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Route: GET /search
// Search products by keywords
router.get('/', async (req, res) => {
  try {
    const { keywords } = req.query;
    const regex = new RegExp(keywords, 'i');
    const products = await Product.find({ $or: [{ title: regex }, { description: regex }] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Route: GET /search/filter
// Filter products by category
router.get('/filter', async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter products' });
  }
});

// Route: GET /search/sort
// Sort products
router.get('/sort', async (req, res) => {
  try {
    const { sortBy } = req.query;
    let sortOptions = {};
    if (sortBy === 'price_asc') {
      sortOptions = { price: 1 };
    } else if (sortBy === 'price_desc') {
      sortOptions = { price: -1 };
    } else if (sortBy === 'date_asc') {
      sortOptions = { createdAt: 1 };
    } else if (sortBy === 'date_desc') {
      sortOptions = { createdAt: -1 };
    }
    const products = await Product.find().sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sort products' });
  }
});

export default router;
