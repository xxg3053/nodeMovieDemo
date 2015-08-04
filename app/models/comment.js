/**
 * comment 模型
 */

var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');

var comment = mongoose.model('Comment',CommentSchema);

module.exports = comment