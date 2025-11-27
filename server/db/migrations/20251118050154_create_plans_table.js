/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('plans', table => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.json('features').notNullable();
    table.integer('duration').notNullable().comment('Duration in days');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plans');
};
