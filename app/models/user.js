/**
 * 模型
 */

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var user = mongoose.model('User',UserSchema);

module.exports = user