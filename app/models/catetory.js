/**
 * 模型
 */

var mongoose = require('mongoose');
var CatetorySchema = require('../schemas/catetory');

var catetory = mongoose.model('Catetory',CatetorySchema);

module.exports = catetory