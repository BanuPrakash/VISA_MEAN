var express = require('express');
var router = express.Router();

var Customers = require('../model/customers');

/* GET customers. */
router.get('/', function(req, res, next) {
   Customers.find({},function(err,docs){
   	res.json(docs);
   });
});

/* GET customer by ID. */
router.get('/:id', function(req, res, next) {
   Customers.find({'id': req.params.id},function(err,docs){
   	res.json(docs);
   });
});

/* POST a customer */
router.post('/', function(req, res, next) {
   Customers.create(req.body,function(err,docs){
   	res.send("customer added!!!");
   });
});

/* PUT for update */
router.put('/:id', function(req, res, next) {
   Customers.update({'id': req.params.id},req.body,function(err,docs){
   	res.send("customer updated!!!");
   });
});

/* DELETE */
router.delete('/:id', function(req, res, next) {
   Customers.remove({'id': req.params.id},function(err,docs){
   	res.send("customer removed!!!");
   });
});

module.exports = router;
