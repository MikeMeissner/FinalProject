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

/* Render survey list main page. */
router.get('/', function (req, res, next) {
    Survey.find(function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/index', {
                title: 'Surveys',
                surveys: survey,
                id: req.surveys ? req.surveys.id : '',
                surveyName: req.surveys ? req.surveys.surveyName : '',
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

router.get('/create', requireAuth, function (req, res, next) {
    Survey.find(function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/createSurvey', {
                title: 'Create Surveys',
                surveys: survey,
                surveyName: req.surveys ? req.surveys.surveyName : '',
                displayName: req.user ? req.user.displayName : '',
                username: req.user ? req.user.username : ''
            });
        }
    });
});

router.post('/create', requireAuth, function (req, res, next) {
    var survey = new Survey(req.body);
    Survey.create({
        surveyName: req.body.surveyName,
        username: req.body.username,
	    surveyMultipleChoice: req.body.surveyMultipleChoice,
	    question: req.body.question,
	    surveyNumber: req.body.surveyNumber,
	    answertextA: req.body.answertextA,
	    answertextB: req.body.answertextB,
	    answertextC: req.body.answertextC,
	    answertextD: req.body.answertextD,
	    startDate: req.body.startDate,
	    endDate: req.body.endDate
    }, function (err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/surveys/view');
        }
    });
});

router.get('/view', requireAuth, function (req, res, next) {
    Survey.find(function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/yourSurveys', {
                title: 'View Surveys',
                surveys: survey,
                id: req.surveys ? req.surveys.id : '',
                username: req.user ? req.user.username : '',
                surveyName: req.surveys ? req.surveys.surveyName : '',
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

router.get('/results/:id', function (req, res, next) {
    var id = req.params.id;
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/surveyResults', {
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

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/surveyAnswer', {
                title: 'Answer Surveys',
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

/* process the edit form submission */
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var surveys = new Survey(req.body)
    
    surveys._id = id;
      
    // use mongoose to do the update
    Survey.update({ _id: id}, surveys, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            surveys.answerA + 1;
            res.redirect('survey/surveyResults');
        }
    });
});

module.exports = router;