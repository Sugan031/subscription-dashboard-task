const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const { AppError, asyncHandler } = require('../utils/errorHandler');

// Subscribe to a plan
exports.subscribe = asyncHandler(async (req, res, next) => {
  const { planId } = req.params;
  const userId = req.user.userId;

  // Check if plan exists
  const plan = await Plan.findById(planId);
  if (!plan) {
    return next(new AppError('Plan not found', 404));
  }

  // Check if user already has an active subscription
  const existingSubscription = await Subscription.findActiveByUserId(userId);
  if (existingSubscription) {
    return next(new AppError('You already have an active subscription', 400));
  }

  // Calculate dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  // Create subscription
  const subscription = await Subscription.create({
    userId,
    planId,
    startDate,
    endDate
  });

  res.status(201).json({
    success: true,
    message: 'Subscription created successfully',
    data: { subscription }
  });
});

// Get user's active subscription
exports.getMySubscription = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  const subscription = await Subscription.findActiveByUserId(userId);

  if (!subscription) {
    return res.status(200).json({
      success: true,
      data: { subscription: null }
    });
  }

  res.status(200).json({
    success: true,
    data: { subscription }
  });
});

// Admin: Get all subscriptions
exports.getAllSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.findAll();

  res.status(200).json({
    success: true,
    data: {
      subscriptions,
      count: subscriptions.length
    }
  });
});