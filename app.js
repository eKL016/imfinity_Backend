var Passport = require('passport');
var express = require('express');
var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var App = express();
App.use(BodyParser.json());
App.use(CookieParser('NTUIMB04'));
App.use(Passport.initialize());
App.use(Passport.session());
App.set('port',process.env.PORT||3000);
//App.configure('development',function(){
//	App.use(express.errorHandler({dumpExceptions: true, showStack: true}));
//});

//App.configure('production', function(){
//	App.use(express.errorHandler());
//});

var Account = require('./models/account');
Passport.use(new LocalStrategy(Account.authenticate()));
Passport.serializeUser(Account.serializeUser());
Passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/imfinity');


require('./routes')(App);

App.listen(App.get('port'),function(){
	console.log(("Express server listening on "+App.get('port')));
});
