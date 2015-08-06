/**
 * 首页控制器
 */
var Movie = require('../models/movie');
var Catetory = require('../models/catetory');

//index page
exports.index = function(req,res){
	// console.log('user in session:');
	// console.log(req.session.user);
	Catetory
		.find({})
		.populate({path:'movies',options:{limit:5}})
		.exec(function(err,catetories){
			if(err){
				console.log(err);
			}
			// console.log(movies)
			res.render('index',{
				title:'首页',
				catetories:catetories
			})
		})
}

//search
exports.search = function(req,res){
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p,10) || 0
	var count = 2
	var index = page * count
	if(catId){
		Catetory
			.find({_id:catId})
			.populate({
				path:'movies',
				select:'title poster'
			})
			.exec(function(err,catetories){
				if(err){
					console.log(err);
				}
				// console.log(movies)
				var catetory = catetories[0] || {}
				var movies= catetory.movies || []
				var results = movies.slice(index,index+count)

				res.render('results',{
					title:'结果列表页',
					keyword:catetory.name,
					currentPage: page + 1,
					totalPage: Math.ceil(movies.length / count ),
					query:'cat='+ catId,
					movies:results
				})
			})
		
	}
	else{
		Movie
			.find({title:new RegExp(q + '.*','i')})
			.exec(function(err,movies){
				if(err){
					console.log(err);
				}
				// console.log(movies)
				var results = movies.slice(index,index+count)

				res.render('results',{
					title:'结果列表页',
					keyword:q,
					currentPage: page + 1,
					totalPage: Math.ceil(movies.length / count ),
					query:'q='+ q,
					movies:results
				})
			})
	}
}