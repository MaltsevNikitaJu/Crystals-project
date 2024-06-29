/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('products', (table) => {
        table.string('image_url').notNullable();
        table.decimal('protein', 5, 2).notNullable();
        table.decimal('fat', 5, 2).notNullable();      
        table.decimal('carbohydrates', 5, 2).notNullable();
        table.integer('calories').notNullable();      
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('products', (table) => {
        // Удаление добавленных столбцов
        table.dropColumn('image_url');
        table.dropColumn('protein');
        table.dropColumn('fat');
        table.dropColumn('carbohydrates');
        table.dropColumn('calories');
      });
};
