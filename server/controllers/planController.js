const Plan = require('../models/Plan');
const { asyncHandler } = require('../utils/errorHandler');

exports.getAllPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.findAll();

  res.status(200).json({
    success: true,
    data: { plans }
  });
});