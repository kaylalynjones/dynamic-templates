'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.get('/', function(req,res){
  res.render('home');
});

app.get('/checkers', function(req,res){
  res.render('checkers');
});

app.get('/add/:w/:x/:y/:z', function(req,res){
  req.params.w *= 1;
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.z *= 1;

  console.log(req.params, req.query);
  req.params.fontsize = req.query.fontsize;//adds fontsize key/value to the req.param
  req.params.bordercolor = req.query.bordercolor;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sumlist/:list', function(req,res){
  var nums = req.params.list.split(',');
  nums = nums.map(function(x){return x * 1;});
  var sum = 0;
  for (var i=0; i<nums.length; i++){
    sum += nums[i];
  }
  var obj = {nums:nums, sum:sum, even:req.query.even, odd:req.query.odd};
  console.log(obj);
  res.render('sumlist', obj);
});

app.get('/rolldice/:x', function(req,res){
  req.params.x *= 1;
  var rolls = req.params.x;
  //console.log(rolls);
  var nums= [];
  var num = 0;
  var sum = 0;
  for (var i=0; i<rolls; i++){
    num = Math.floor(Math.random()*6)+1;
    nums.push(num);
    //sum += num; should have done this    <-----------
  }
  for (i=0; i<nums.length; i++) {
    sum += nums[i];
  }
  //console.log(sum);
  //console.log(nums);
  var obj = {nums:nums, sum:sum};
  res.render('rolldice', obj);
});

//dynamic port changing
var port = process.env.PORT;
app.listen(port, function(){
  console.log('Express is listening on PORT', port);
});
