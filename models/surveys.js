// Todo Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveysSchema = new Schema({
	surveyName: String,
	username: String,
	numQuestions: String,
	surveyType: String,
	questions: String,
	answerSelected: String,
	startDate: {type: Date},
	endDate: {type: Date}
}, {
	collection: 'surveys'
});

module.exports = mongoose.model('Surveys', SurveysSchema);