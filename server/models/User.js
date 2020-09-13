const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type:String,
        required:true,
        max:1024,
        min:6
    },
    email: {
        type:String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',UserSchema);

module.exports = User;