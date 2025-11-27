const db = require('../config/database');

class Subscription {
  static async create({ userId, planId, startDate, endDate }) {
    const [subscription] = await db('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        start_date: startDate,
        end_date: endDate,
        status: 'active'
      })
      .returning('*');

    return subscription;
  }

  static async findActiveByUserId(userId) {
    return await db('subscriptions')
      .where({ user_id: userId, status: 'active' })
      .join('plans', 'subscriptions.plan_id', 'plans.id')
      .select(
        'subscriptions.*',
        'plans.name as plan_name',
        'plans.price',
        'plans.features',
        'plans.duration'
      )
      .first();
  }

  static async findAll() {
    return await db('subscriptions')
      .join('users', 'subscriptions.user_id', 'users.id')
      .join('plans', 'subscriptions.plan_id', 'plans.id')
      .select(
        'subscriptions.*',
        'users.name as user_name',
        'users.email as user_email',
        'plans.name as plan_name',
        'plans.price'
      )
      .orderBy('subscriptions.created_at', 'desc');
  }

  static async cancelActiveSubscription(userId) {
    return await db('subscriptions')
      .where({ user_id: userId, status: 'active' })
      .update({ status: 'cancelled' });
  }
}

module.exports = Subscription;