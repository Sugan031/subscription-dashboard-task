/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Delete existing entries
  await knex('users').del();

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Insert users
  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    },
    {
      name: 'Test User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user'
    }
  ]);
};
