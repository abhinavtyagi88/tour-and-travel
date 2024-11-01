const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Prefer environment variable

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');  // Directly get the token

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Attach decoded payload to req.user
        next();  // Pass control to the route handler
    } catch (error) {
        res.status(401).json({ message: 'Token verification failed. Authorization denied.' });
    }
};

module.exports = authMiddleware;
