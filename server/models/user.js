var bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});


module.exports = User;
