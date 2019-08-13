var express = require('express');
var router = express.Router();

var Comment = require('../models/Comment.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Comment');
});

router.get('/all', function(req, res, next) {
    var a=new Comment({
    });
    a.selectall(function(err, results) {
        if (err){
            res.render('Comment', {errMsg: err});
            return;
        }else{
            console.log(results);
            res.send(results);
        }
    });
});
router.post("/",function(req, res) {
});

module.exports = router;