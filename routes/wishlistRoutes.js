import express from 'express';
import Wishlist from '../models/Wishlist.js';
import authenticate from '../middleWare/authMiddleWare.js';
const router = express.Router();

// Route: POST /wishlist
// Add a product to the wishlist
router.post('/', authenticate, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      // If wishlist doesn't exist, create a new one
      const newWishlist = new Wishlist({ userId, products: [productId] });
      const savedWishlist = await newWishlist.save();
      res.status(201).json(savedWishlist);
    } else {
      // If wishlist already exists, add the product to the existing wishlist
      wishlist.products.push(productId);
      const updatedWishlist = await wishlist.save();
      res.json(updatedWishlist);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
});

// Route: GET /wishlist/:userId
// Get the wishlist for a user
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Route: DELETE /wishlist/:userId/:productId
// Remove a product from the wishlist
router.delete('/:userId/:productId', authenticate, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    
    // Remove the product from the wishlist's products array
    wishlist.products = wishlist.products.filter(
      (productId) => productId !== req.params.productId
    );
    
    const updatedWishlist = await wishlist.save();
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
});

// Route: DELETE /wishlist/:userId
// Clear the entire wishlist
router.delete('/:userId', authenticate, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ userId: req.params.userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear wishlist' });
  }
});

export default router;
