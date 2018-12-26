const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    kind: String,
    price: String,
    size:Number,
    amount: Number,
    description: String,
    date: String,
    owner:String,
    imageSource:String,
    images: Array
    //add additional formation info later
});

module.exports = mongoose.model('products', Product);
