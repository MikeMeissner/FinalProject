/*
 * routes\result.js
 * Rob Page, Josh Mangoff, Mike Meissner
 * RJM Surveys
 * Redirects users to pages to view results
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


router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/surveyResults', {
                title: 'Survey Results',
                surveys: survey,
                id: req.surveys ? req.surveys.id : '',
                username: req.user ? req.user.username : '',
                surveyName: req.surveys ? req.surveys.surveyName : '',
                displayName: req.user ? req.user.displayName : '',
                surveyMultipleChoice: req.surveys ? req.surveys.surveyMultipleChoice : '',
	            question: req.surveys ? req.surveys.question : '',
	            surveyNumber: req.surveys ? req.surveys.surveyNumber : '',
	            answertextA: req.surveys ? req.surveys.answertextA : '',
	            answertextB: req.surveys ? req.surveys.answertextB : '',
	            answertextC: req.surveys ? req.surveys.answertextC : '',
	            answertextD: req.surveys ? req.surveys.answertextD : '',
	            startDate: req.surveys ? req.surveys.startDate : '',
	            endDate: req.surveys ? req.surveys.endDate : ''
            });
        }
    });
});

module.exports = router;