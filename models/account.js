var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	school: String,
	grade: Number,
	type: String,
	vegan: Boolean,
	mSpecial: String,
	sSpecial: String,
	size: String,
	tel: String,
	facebook: String,
	email: String,
	emergencyContact:String,
	emergencyTel:String,
	selfIntro: String,
	mot: String,
	demand: String,
	contactUs: String,
	howToKnowUs: Array
});

Account.plugin(passportMongoose);

module.exports = mongoose.model('Account', Account);
