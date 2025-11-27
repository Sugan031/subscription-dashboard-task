const { AppError } = require('../utils/errorHandler');

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new AppError('Access denied', 403));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to access this resource', 403));
    }

    next();
  };
};

module.exports = roleMiddleware;