import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Get the token from the request headers or other location
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user has admin privileges
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Access denied. Admin privileges required' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default adminAuth;
