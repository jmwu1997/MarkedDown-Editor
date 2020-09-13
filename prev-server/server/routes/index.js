var express = require('express');
var router = express.Router();
var path = require('path');
var pubDir = path.join(__dirname + '/../public');
var rootDir = path.join(__dirname + '/../');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const File = require('../models/File');
const passport = require('passport');
const uuid = require('uuid');
/* GET home page. */
router.get('/',forwardAuthenticated,function (req,res){
	res.sendFile(path.join(pubDir + '/index.html'));
});
router.get('/editor',ensureAuthenticated,function (req,res){
	res.sendFile(path.join(pubDir + '/editor.html'));
	// res.send("Welcome to the editor,"+req.user);
});

router.get('/login', forwardAuthenticated, function (req, res) {
	res.sendFile(path.join(pubDir + '/login.html'));
});
router.get('/signup', forwardAuthenticated, function (req, res) {
	res.sendFile(path.join(pubDir + '/signup.html'));
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

router.post('/register', function(req, res, next) {
	console.log('registering user');
	User.register(new User({username: req.body.username}), req.body.password, function(err) {
	  if (err) {
		console.log('error while user register!', err);
		return next(err);
	  }
  
	  console.log('user registered!');
  
	  res.redirect('/login');
	});
  });
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
	console.log('user login!');
	res.redirect('/editor');
});

router.post('/create',function (req,res) {	// create a file
	var newFile = new File({
		username:req.user.username,
		id:uuid.v4(),
		filename:req.body.filename,
		text:req.body.text,
		creationDate:Date.now(),
		modificationDate:Date.now()
	});
	newFile.save();
	console.log("file created");
	res.send("file created,id:"+newFile.id);
});

router.post('/find',function (req,res) { // find a file by id
	var uname = req.user.username;
	console.log(req.body.id);
	if(req.body.id!==""){
		File.find({username:uname,id:req.body.id}, function (err, docs) {
			if(err){
				res.status(500).send(err);
			}
			res.send(docs);
		});
	}else{
		res.status(400).send("file ID not provide");
	}
});

router.post('/list',function (req,res) { // list all files created by a user
	var uname = req.user.username;
	File.find({ username:uname}, function (err, docs) {
		if(err){
			res.send(err);
		}
		res.send(docs);
	});
});

router.post('/update',function (req,res) { // update a existed file
	var uname = req.user.username;
	console.log(uname);
	if(req.body.id!==""){
		File.findOneAndUpdate({username:uname,id:req.body.id},{filename:req.body.filename,text:req.body.text,modificationDate:Date.now()},{new:true}).exec(function(err,docs){
			if(err){
				res.status(500).send(err);
			}
			res.send(docs);	// return modified documented
		}); 
	}else{
		res.status(400).send("file ID not provide");
	}
});

router.post('/delete',function (req,res) { // delete a existed file
	var uname = req.user.username;
	console.log(uname);
	if(req.body.id!==""){
		File.findOneAndDelete({username:uname,id:req.body.id}).exec(function(err,docs){
			if(err){
				res.status(500).send(err);
			}
			res.send("file deleted");	// delete success
		}); 
	}else{
		res.status(400).send("file ID not provide");
	}
});

module.exports = router;
