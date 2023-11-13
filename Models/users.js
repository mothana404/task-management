const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    user_name : String,
    user_email : String,
    user_password : String
});
const user = mongoose.model("user", userSchema);
module.exports = user;