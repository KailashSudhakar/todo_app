var express = require('express');
var router = express.Router();
var Todo = require('../models/todo_list');
var knex = require('../db/knex');

/*
router.get('/', function(req, res, next) {
  Todo.where({user_id: req.query.user})
    .fetch()
    .then(function(record){
      if(record){
	res.send({exists: true});
      }
      else{
	res.send({exists: false});
      }
    }).catch(err => res.send({error: err.message}));
});
*/
router.get('/', function(req, res, next) {
  Todo.fetchAll()
  .then(function(records){
    res.send(records.toJSON());
  });
});

router.post('/create', function(req, res, next) {
  var args = getParams(req.body);
  Todo.create(args)
  .then(function(records){
    res.send(records.toJSON());
  }, function(err){
    res.send({error: err.message});
  });

});

var getParams = function(query){
  var args = {}
  if(query.todo_name){
    args.todo_name = query.todo_name;
  }
  return args;
}

module.exports = router;
