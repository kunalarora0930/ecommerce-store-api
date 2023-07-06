import express from 'express';
import Product from '../models/Product.js';
import adminAuth from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

// Route: GET /products
// Get all products
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route: GET /products/:productId
// Get a specific product by ID
router.get('/products/:productId', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Route: POST /products
// Create a new product
router.post('/products', adminAuth, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newProduct = new Product({ title, description, price });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Route: PUT /products/:productId
// Update a product by ID
router.put('/products/:productId', adminAuth, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { title, description, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Route: DELETE /products/:productId
// Delete a product by ID
router.delete('/products/:productId', adminAuth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
