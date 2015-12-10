/*
 * routes\survey.js
 * Rob Page, Josh Mangoff, Mike Meissner
 * RJM Surveys
 * Redirects users to pages for creating and end viewing surveys
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

var Survey = require('../models/surveys');
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
router.get('/', function (req, res, next) {
    Survey.find(function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/index', {
                title: 'Surveys',
                survey: survey,
                surveyName: req.surveys ? req.surveys.surveyName : '',
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});