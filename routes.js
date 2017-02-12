var passport = require('passport');
var Account = require('./models/account');
 
module.exports = function(app){
	app.post('/',function(req,res){
		Account.register(new Account({username: req.body.username, grade: req.body.grade}),req.body.password,function(err,account){
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
