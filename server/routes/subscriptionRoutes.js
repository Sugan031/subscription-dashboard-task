const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/subscribe/:planId',
  authMiddleware,
  subscriptionController.subscribe
);

router.get(
  '/my-subscription',
  authMiddleware,
  subscriptionController.getMySubscription
);

router.get(
  '/admin/subscriptions',
  authMiddleware,
  roleMiddleware(['admin']),
  subscriptionController.getAllSubscriptions
);

module.exports = router;