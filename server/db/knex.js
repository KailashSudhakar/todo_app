var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port: 3306,
    user     : 'blue',
    password: 'blue',
    database : 'todo_app',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  }
});

module.exports = knex;
