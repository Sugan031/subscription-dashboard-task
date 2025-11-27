const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const { AppError, asyncHandler } = require('../utils/errorHandler');

// Register new user
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const emailExists = await User.emailExists(email);
  if (emailExists) {
    return next(new AppError('Email already registered', 400));
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role
  });
  const refreshToken = generateRefreshToken({
    userId: user.id
  });

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    }
  });
});

// Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findByEmail(email);
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Verify password
  const isPasswordValid = await User.comparePassword(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role
  });
  const refreshToken = generateRefreshToken({
    userId: user.id
  });

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    }
  });
});

// Refresh access token
exports.refresh = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new AppError('Refresh token not found', 401));
  }

  // Verify refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // Generate new access token
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role
  });

  res.status(200).json({
    success: true,
    data: { accessToken }
  });
});

// Logout user
exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});