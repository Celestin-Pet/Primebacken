import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to authenticate users
export const authenticateUser = (req, res, next) => {
  // Extract the token from the Authorization header (format: Bearer <token>)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Unauthorized access.' });
  }

  const token = authHeader.split(' ')[1]; // Get the token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded user info to the request object (req.user)
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized. Token has expired.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    // General error handling for other issues
    return res.status(500).json({ message: 'Server error. Failed to authenticate.' });
  }
};
