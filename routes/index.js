var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Utility function to check if user is authenticatd */
function requireAuth(req, res, next){
  
    // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
   });
});

/* GET surveys page. */
router.get('/surveys', function(req, res, next) {
  res.render('surveys', { 
    title: 'Surveys',
   });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { 
    title: 'Register',
   });
});

/* GET Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
        });
    }
    else {
        return res.redirect('/surveys');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
