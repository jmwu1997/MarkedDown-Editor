var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
var FileSchema = new Schema({
    username: {
        type:String
    },
    id: {
        type:String,
        default:uuid.v4()
    },
    filename: {
        type:String,
        default:"Untitled"
    },
    text: {
        type:String
    },
    creationDate:{
        type:Date,default:Date.now
    },
    modificationDate:{
        type:Date,
        default:Date.now}
});
const File = mongoose.model('File',FileSchema);
module.exports = File;