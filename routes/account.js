var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* Render User main page. */
router.get('/', requireAuth, function (req, res, next) {
    User.find(function (err, user) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('account', {
                title: 'Account',
                user: user,
                username: req.user ? req.user.username : '',
                displayName: req.user ? req.user.displayName : '',
                email: req.user ? req.user.email : '',
                created: req.user ? req.user.created : '',
                updated: req.user ? req.user.updated : ''
            });
        }
    });
});

module.exports = router;

