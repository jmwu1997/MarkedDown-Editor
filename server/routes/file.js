var express = require('express');
var router = express.Router();
var md = require('markdown-it')();
var PicGo = require('picgo');
var path = require('path');
var fs = require('fs');
var rootDir = path.join(__dirname + '/../');
var imgDir = path.join(__dirname+"/../img/");
var picgo = new PicGo(rootDir+'/picgo/config.json');
// const { ensureAuthenticated, forwardAuthenticated } = require('../lib/auth');
const User = require('../models/User');
const File = require('../models/File');
// const passport = require('passport');
const uuid = require('uuid');


router.post('/create',function (req,res,next) {	// create a file
    console.log(req.body.username);
    var newFile = new File({
        username:req.body.username,
        id:uuid.v4(),
        filename:req.body.filename,
        text:req.body.text,
        creationDate:Date.now(),
        modificationDate:Date.now()
    });
    newFile.save();
    res.send(newFile);
});

router.post('/find',function (req,res) { // find a file by id
	console.log(req.body.id);
	if(req.body.id!==""){
		File.find({id:req.body.id}, function (err, docs) {
			if(err){
				res.status(400).send(err);
			}
			res.send(docs);
		});
	}else{
		res.status(400).send("file ID not provide");
	}
});

router.post('/list',function (req,res) { // list all files created by a user
    var uname = req.body.username;
    console.log(uname);
	File.find({ username:uname}, function (err, docs) {
		if(err){
			res.status(400).send(err);
		}
		res.send(docs);
	});
});

router.post('/update',function (req,res) { // update a existed file
	if(req.body.id!==""){
		File.findOneAndUpdate({id:req.body.id},{filename:req.body.filename,text:req.body.text,modificationDate:Date.now()},{new:true}).exec(function(err,docs){
			if(err){
				res.status(400).send(err);
			}
			res.send(docs);	// return modified documented
		}); 
	}else{
		res.status(400).send("file ID not provide");
	}
});

router.post('/delete',function (req,res) { // delete a existed file
	var uname = req.body.username;
	console.log(uname);
	if(req.body.id!==""){
		File.findOneAndDelete({username:uname,id:req.body.id}).exec(function(err,docs){
			if(err){
				res.status(400).send(err);
			}
			res.send("deleted");	// delete success
		}); 
	}else{
		res.status(400).send("file ID not provide");
	}
});

router.post('/render',function (req,res) { // render markdown code
	var text = req.body.text;
	var result = md.render(text);
	res.send(result);
});

router.post('/uploadimg',function (req,res) {
	var filename = req.files.file.name;
	req.files.file.mv(imgDir+filename,function(err){
		if(err)
			return res.status(400).send(err);
		else{
			var filepath = imgDir+filename;
			picgo.on('finished',ctx=>{
				// fs.unlink(filepath,function(error) {
				// 	if (error) {
				// 		throw error;
				// 	}
				// 	console.log('Image deleted');
			});
			picgo.upload([filepath]).then(()=>{
                    //console.log(picgo.output[0].imgUrl);
                    res.send(picgo.output[0].imgUrl);
            });
		}
	});
});


module.exports = router;
