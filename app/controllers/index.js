/**
 * 首页控制器
 */
var Movie = require('../models/movie');

//index page
exports.index = function(req,res){
	// console.log('user in session:');
	// console.log(req.session.user);

	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		console.log(movies)
		res.render('index',{
			title:'首页',
			movies:movies
		})
	})
}