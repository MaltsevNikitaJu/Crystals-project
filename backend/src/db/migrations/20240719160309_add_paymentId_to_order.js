/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("orders", function (table) {
    table.string("idempotence_key").unique();
    table.string("payment_id").unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("orders", function (table) {
    table.dropColumn("idempotence_key");
  });
};
