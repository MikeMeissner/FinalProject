/*
 * routes\account.js
 * Rob Page, Josh Mangoff, Mike Meissner
 * RJM Surveys
 * Redirects users to pages for creating and editing a user
 */

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
            res.render('account/index', {
                title: 'Account',
                user: user,
                id: req.user ? req.user.id : '',
                username: req.user ? req.user.username : '',
                displayName: req.user ? req.user.displayName : '',
                email: req.user ? req.user.email : '',
                created: req.user ? req.user.created : '',
                updated: req.user ? req.user.updated : ''
            });
        }
    });
});

router.get('/:id', requireAuth, function (req, res, next) {
    User.find(function (err, user) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('account/edit', {
                title: 'Edit',
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

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user._id = id;
    user.updated = Date.now();
    
    // use mongoose to do the update
    User.update({ _id: id }, user, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;

