const { verifyAccessToken } = require('../utils/tokenUtils');
const { AppError } = require('../utils/errorHandler');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(error.message || 'Authentication failed', 401));
  }
};

module.exports = authMiddleware;