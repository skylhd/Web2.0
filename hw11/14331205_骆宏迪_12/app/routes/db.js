var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/signin');
var db = mongoose.connection;
db.on('connected', function(){
    console.log('The connection open to the db');
})
db.on('error', function(error){
    console.log(error);
});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username : { type:String, match:/^[a-zA-z]\w{5,17}$/, unique: true,required: true},
    password : { type:String,required: true },
    num : { type:String, match:/^[1-9]\d{7,7}$/, unique: true,required: true},
    phone : { type:String, match:/^[1-9]\d{10,10}$/, unique: true,required: true},
    email : { type:String, match:/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/, unique: true,required: true}
});
module.exports = db.model('user', userSchema);