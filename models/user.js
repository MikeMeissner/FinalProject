/*
 * models\user.js
 * Rob Page, Josh Mangoff, Mike Meissner
 * RJM Surveys
 * Builds user to allow login, called from register
 */

// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// user creation plan
var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  displayName: String,
  salt: String,
  provider:String,
  providerId: String,
  providerData: {},
  created: Number,
  updated: Number
}, {
  collection: 'userInfo'
});

// Generating a Hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);