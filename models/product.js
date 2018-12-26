const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const Product = new Schema({
    name: String,
    kind: String,
    size:Number,
    description: String,
    date: String,
    imageSource:String,
    images: Array,
    stories: Array
    //add additional formation info later
});

module.exports = mongoose.model('products', Product);
