const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const passport = require('passport');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // validate user before create a new user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});
    // check if user is existed
    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).json({error:'Username existed already'});
    // Hash passwords
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check if user exist
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('User does not exist');
    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.tokenSecret);
    res.header('auth-token',token).json({token:token , username: req.body.username});

    console.log('user login!');

});

module.exports = router;
