import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authenticate from '../middleWare/authMiddleWare.js';

const router = express.Router();



// Route: POST /signup
// User signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Generate JWT
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Route: GET /users
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route: POST /login
// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if user exists and compare passwords
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Send the token in the response
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to authenticate' });
    }
  });

// Route: GET /users/:id
// Get a specific user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Route: PUT /users/:id
// Update a user by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Route: DELETE /users/:id
// Delete a user by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
