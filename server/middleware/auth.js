// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

// Generate a 256-bit (32-byte) key
export const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded payload to the request object
    next(); // Move to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ error: 'Access Denied: Invalid Token' });
  }
};

module.exports = verifyToken;