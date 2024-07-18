/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('products', (table) => {
      table.integer('category_id').unsigned().references('id').inTable('categories');
      table.text('composition').notNullable();
      table.text('tags').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('products', (table) => {
      table.dropColumn('category_id');
      table.dropColumn('composition');
      table.dropColumn('tags');
    });
  };
  
