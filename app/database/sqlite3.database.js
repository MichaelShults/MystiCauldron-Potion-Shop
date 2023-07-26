const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);
db.raw("PRAGMA foreign_keys = ON;").then(() => {
    console.log("Foreign Key Check activated.");
});

module.exports = db;