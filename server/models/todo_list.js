var bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

var Todo = bookshelf.Model.extend({
  tableName: 'todo_list',
  hasTimestamps: false
});


module.exports = Todo;
