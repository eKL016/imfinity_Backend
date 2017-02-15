var passport = require('passport');
var Account = require('./models/account');

module.exports = function(app) {
    //IMPORTANT!!!!! UNSAFE CODE
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });
    //REMOVE ABOVE BEFORE PRODUCTION
    app.post('/register', function(req, res) {
        var password = req.body.password;
        delete req.body.password;
        console.log(req);
        Account.register(new Account(req.body), password, function(err, account) {
            if (err) {
                console.log(err);
                res.send('FAILED!');
            } else {
                console.log('Created successfully.');
                res.send('Created successfully.');
            }
        });
    });


    app.get('/list', function(req, res) {

    });

};
