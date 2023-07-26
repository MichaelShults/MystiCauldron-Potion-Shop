/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("shoppingSessions", (table) => {
        //
        table.increments("id");
        //
        table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

    }).createTable("cartItems", (table) => {
        //
        table.increments("id");
        //
        table
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        //
        table
        .integer("shoppingSessionId")
        .unsigned()
        .references("id")
        .inTable("shoppingSessions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("shoppingSessions")
    .dropTableIfExists("cartItems");
};
