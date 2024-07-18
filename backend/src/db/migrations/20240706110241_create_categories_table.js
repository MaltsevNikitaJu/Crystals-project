/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const hasColumn = await knex.schema.hasColumn('products', 'category_id');
  if (hasColumn) {
    await knex.schema.alterTable('products', (table) => {
      table.dropColumn('category_id');
    });
  }

  await knex.schema.dropTableIfExists('categories');
};
