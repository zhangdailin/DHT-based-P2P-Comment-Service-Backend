var express = require('express');
var router = express.Router();

var Comment = require('../models/Comment.js');
router.get('/', function(req, res, next) {
    res.render('addComment', {errMsg : ''});
});

router.get('/add/test', function(req, res, next) {
  var query = require('url').parse(req.url,true).query;
  var url = query.id;
  console.log(url);
    var a=new Comment({
        URL:url
    });
    a.selecturl(function (err, result) {
        if (err){
            res.render('addComment', {errMsg: err});
            return;
        }else{
            console.log(result);
            res.send(result);
        }
    });
});

router.put('/', function(req, res, next) {
    var c=req.body;
    var URL=c["URL_Address"];
    var Value=c["Value"];
    var b=new Comment({
        URL:URL,
        Value:Value
    });
    b.addComment(function(err,result){
        if (err) {
            res.render('addComment', {errMsg: err});
            return;
        }
        else {
            res.render('addComment', {errMsg: 'add Comment success!' });
        }
    })
});

module.exports = router;