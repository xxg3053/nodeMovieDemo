/**
 * movie控制器
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Catetory = require('../models/catetory');
var _ = require('underscore');

//detail page
exports.detail = function(req,res){
	var id = req.params.id
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		Comment
		.find({movie:id})
		.populate('from','name')
		.populate('reply.from reply.to','name')
		.exec(function(err,comments){
			// console.log(comments)
			res.render('detail',{
				title:'详情 ' + movie.title,
				movie:movie,
				comments:comments
			})
		})
		
	})
}


	//admin new page
exports.new = function(req,res){
	 Catetory.find({},function(err,catetories){
		 res.render('admin',{
		 	title:'后台电影录入',
		 	catetories:catetories,
		 	movie:{}
		 });
	 	
	 })
}
	//admin post update
exports.update = function(req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			Catetory.find({},function(err,catetories){
				res.render('admin',{
					title:'后台更新数据',
					movie:movie,
					catetories:catetories
				})
			})
			
		})
	}
}

	// admin post movie
exports.save = function(req,res){
	//console.log('new ');
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie

	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			//更新
			_movie = _.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				//重定向到详情页
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie = new Movie(movieObj)
		var catetoryId = movieObj.catetory
		var catetoryName = movieObj.catetoryName
		_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				if(catetoryId){
					Catetory.findById(catetoryId,function(err,catetory){
						catetory.movies.push(movie.id)

						catetory.save(function(err,catetory){
							//重定向到详情页
							res.redirect('/movie/'+movie._id)
							
						})
					})
					
				}
				else if(catetoryName){
					var catetory = new Catetory({
						name:catetoryName,
						movies:[movie._id]
					})
					catetory.save(function(err,catetory){
						movie.catetory = catetory._id
						movie.save(function(err,movie){
							res.redirect('/movie/' + movie._id)
						})
						
					})
				}
			})
	}
}

	//list page
exports.list = function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'列表',
			movies:movies
		})
	})
}

	// delete movie
exports.del = function(req,res){
	var id = req.query.id;

	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}