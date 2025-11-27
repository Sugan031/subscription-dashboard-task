const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role
      })
      .returning(['id', 'name', 'email', 'role', 'created_at']);

    return user;
  }

  static async findByEmail(email) {
    return await db('users').where({ email }).first();
  }

  static async findById(id) {
    return await db('users')
      .where({ id })
      .select('id', 'name', 'email', 'role', 'created_at')
      .first();
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async emailExists(email) {
    const user = await db('users').where({ email }).first();
    return !!user;
  }
}

module.exports = User;