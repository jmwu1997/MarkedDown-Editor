var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {type:String,unique:true},
    password: {type:String}
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',UserSchema);
module.exports = User;