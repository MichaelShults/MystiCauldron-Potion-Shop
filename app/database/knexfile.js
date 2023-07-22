const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: __dirname + "/../../migrations",
        tableName: 'migrations'
      },
  },
  
};
