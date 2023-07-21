/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {id: 1, name: "red", price:10.5, description:"A hot power potion!", img_filename:"potion_red.jfif"},
    {id: 2, name: "blue", price:8, description:"A relaxing potion for your peace of mind.", img_filename:"potion_blue.jfif"},
    {id: 3, name: "green", price:12, description:"A potion that connects you with nature.", img_filename:"potion_green.jfif"},
  ]);
};
