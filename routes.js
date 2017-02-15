var passport = require('passport');
var Account = require('./models/account');

module.exports = function(app){
	app.post('/register',function(req,res){
    var password = req.body.password;
    delete req.body.password;
    console.log(req.body);
		Account.register(new Account(req.body),password,function(err,account){
			if(err){
				console.log(err);
				res.send('FAILED!');
			}
			else{
				console.log('Created successfully.');
				res.send('Created successfully.');
			}
		});
	});


	app.get('/list',function(req,res){

	});

};
