/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.integer('stock').defaultTo(0);
        table.string('image_url');
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
    return knex.schema.dropTable('products');
};
