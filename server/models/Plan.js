const db = require('../config/database');

class Plan {
  static async findAll() {
    return await db('plans').select('*');
  }

  static async findById(id) {
    return await db('plans').where({ id }).first();
  }

  static async create(planData) {
    const [plan] = await db('plans')
      .insert(planData)
      .returning('*');
    return plan;
  }
}

module.exports = Plan;