//file that contains all the routes for the ToDo Functionality

var express = require('express');
var router = express.Router();
var Todo = require('../models/todo_list');
var knex = require('../db/knex');

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

router.patch('/:id', function(req, res, next) {
  var args = getParams(req.body);
  Todo.update(args, {id:req.params.id})
  .then(function(records){
    res.send(records.toJSON());
  }, function(err){
    res.send({error: err.message});
  });
});

router.delete('/:id', function(req, res, next) {
  Todo.destroy({id:req.params.id})
  .then(function(records){
    res.send({success:"deleted"});
  }, function(err){
    res.send({error: err.message});
  });
});

var getParams = function(query){
  var args = {}
  if(query.todo_name){
    args.todo_name = query.todo_name;
  }
  //to handle a bug in Bookshelf which doesn't accept the true value correctly
  if(query.is_active == 'true'){
    args.is_active = 1;
  }
  if(query.is_active == 'false'){
    args.is_active = 0;
  }
  return args;
}


module.exports = router;
