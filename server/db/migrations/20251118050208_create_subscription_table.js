/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('subscriptions', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('plan_id').unsigned().notNullable()
      .references('id').inTable('plans').onDelete('CASCADE');
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.enum('status', ['active', 'expired', 'cancelled']).defaultTo('active');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('subscriptions');
};
