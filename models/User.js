const mongoose = require('mongoose');
//const Schema = mongoose.Schema; // come scrivere const { Schema } = mongoose;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users' , userSchema); // diciamo a mango di creare una nuova collection chiamata users