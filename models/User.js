const mongoose = require('mongoose');
//const Schema = mongoose.Schema; // come scrivere const { Schema } = mongoose;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0} //i crediti sono numeri e di default sono 0
});

mongoose.model('users' , userSchema); // diciamo a mango di creare una nuova collection chiamata users