// Todo Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveysSchema = new Schema({
	surveyName: String,
	username: String,
	numQuestions: int,
	surveyType: String,
	questions: String,
	answerSelected: int,
	startDate: {type: Date},
	endDate: {type: Date}
}, {
	collection: 'surveys'
});

module.exports = mongoose.model('Surveys', SurveysSchema);