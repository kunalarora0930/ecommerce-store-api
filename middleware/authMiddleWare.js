import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers or other location
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user or decoded information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticate;
