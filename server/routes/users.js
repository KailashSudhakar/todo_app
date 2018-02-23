var express = require('express');
var router = express.Router();
var User = require('../models/user');
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  User.where({username: req.query.user})
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


router.post('/create', function(req, res, next) {
   return User.create({username: req.query.user})
  .then(function(user){
    res.send(user.toJSON());
  })
  .catch(err => res.send({error: err.message}));
});

module.exports = router;
