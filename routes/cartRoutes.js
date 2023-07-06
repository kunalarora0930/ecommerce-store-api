import express from 'express';
import Cart from '../models/Cart.js';
import authenticate from '../middleWare/authMiddleWare.js';

const router = express.Router();

// Route: POST /carts
// Create a new cart
router.post('/', authenticate, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create cart' });
  }
});

// Route: GET /carts/:id
// Get cart items by cart ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('items.product', 'name price');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Route: POST /carts/:id/items
// Add an item to the cart
router.post('/:id/items', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += quantity;
    } else {
      // Add a new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Route: PUT /carts/:id/items/:itemId
// Update the quantity of an item in the cart
router.put('/:id/items/:itemId', authenticate, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item quantity in cart' });
  }
});

// Route: DELETE /carts/:id/items/:itemId
// Remove an item from the cart
router.delete('/:id/items/:itemId', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items.pull(req.params.itemId);

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

export default router;
