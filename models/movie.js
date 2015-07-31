/**
 * 模型
 */

var mongoose = require('mongoose');
var MoiveSchema = require('../schemas/movie');

var movie = mongoose.model('Movie',MoiveSchema);

module.exports = movie