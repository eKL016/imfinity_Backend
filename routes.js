var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
var Admin = require('./models/admin');
passport.use(new LocalStrategy(Admin.authenticate()));
module.exports = function(app) {
    //IMPORTANT!!!!! UNSAFE CODE
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });
    //REMOVE ABOVE BEFORE PRODUCTION
    app.get('/',function(req,res){
      res.render('index');
    });
    app.route('/register')
      .get(function(req,res){
          res.render('register');
      })
      .post(function(req, res) {
          var password = req.body.password;
          req.body.pId = password;
          delete req.body.password;
          Account.register(new Account(req.body), password, function(err, account) {
              if (err) {
                console.log(new Date() + ' ' + err);
                return res.send(err);
              } else {
                console.log('學員' + account.username + ' 已於 ' + new Date() + ' 報名');
              }
              return res.send('學員' + account.username + ' 已於 ' + new Date() + ' 報名');
          });
        });
    app.route('/check')
      .get(function(req,res){
          res.render('check');_
      })
      .post(function(req, res){
          Account.findByUsername(req.body.email,function(err,account){
            if(!account) {
                res.send("查無報名紀錄");
            }
            else{
                account.authenticate(req.body.password,function(err,account){
                  if(account) res.send(account.username + "已完成報名作業！");
                  else res.send("查無報名紀錄!");
                })
            }
          })
      });
    app.route('/list')
      .get(function(req,res){
          if(req.user) ;
          else res.redirect('/');
      })
      .post(passport.authenticate('local', {failureRedirect: '/'}),function(req, res) {
          res.send('成功登入');
      });
    app.post('/adminReg',function(req,res){
        Admin.register(new Admin({username: req.body.username}),req.body.password,function(err,admin){
          if(err) res.send(err);
          else res.send("An admin has been created");
        })
    });
    app.get('/adminLogout',function(req,res){
        req.logout();
        res.redirect('/');
    });

};
