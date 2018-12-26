const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    budget: {type:Object,default:{toiletpaper:50}},
    needs: Object

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
