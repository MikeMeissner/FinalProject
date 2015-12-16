/*
 * models\surveys.js
 * Rob Page, Josh Mangoff, Mike Meissner
 * RJM Surveys
 * Builds survey to allow questions and answers
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveysSchema = new Schema({
	surveyName: String,
	username: String,
	surveyMultipleChoice: Boolean,
	question: String,
	answerA: Number,
	answerB: Number,
	answerC: Number,
	answerD: Number,
	answertextA: String,
	answertextB: String,
	answertextC: String,
	answertextD: String,
	startDate: {type: Date},
	endDate: {type: Date}
}, {
	collection: 'surveys'
});

module.exports = mongoose.model('Surveys', SurveysSchema);