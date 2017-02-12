var passport = require('passport');
var Account = require('./models/account');
 
module.exports = function(app){
	app.post('/',function(req,res){
		console.log(req);
		Account.register(new Account({username:req.body.name,grade:req.body.grade,type:req.body.group,school:req.body.school,vegan:req.body.eat,mSpecial:req.body.eatHabbit,sSpecial:req.body.disease,size:req.body.size,tel:req.body.myPhone,facebook:req.body.fb,email:req.body.Email,emergencyContact:req.body.Emergency,emergencyTel:req.body.myPhone2}),req.body.myId,
		function(err,account){
			if(err){
				console.log(err);
				res.status(500).send("Error");
			}
			else{
				console.log('Created successfully.');
				res.status(200).send("OK");
			}
		});
	});

	
	app.get('/list',function(req,res){
			
	});

};
