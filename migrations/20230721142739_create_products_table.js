/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.string("img_filename").notNullable();
        table.float("price").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("products");
};
