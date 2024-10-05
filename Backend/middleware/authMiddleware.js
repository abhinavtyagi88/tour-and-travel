const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Prefer environment variable

function authMiddleware(req, res, next) {
    // Check for the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Get the token after "Bearer"
    if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: 'Invalid token', details: error.message });
    }
}

module.exports = authMiddleware;
