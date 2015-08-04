/**
 * movie控制器
 */
var Movie = require('../models/movie');
var Comment = require('../models/comment');
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
	 res.render('admin',{
	 	title:'后台录入',
	 	movie:{
	 		title:'',
	 		doctor:'',
	 		country:'',
	 		year:'',
	 		poster:'',
	 		flash:'',
	 		summary:'',
	 		language:''
	 	}
	 });
}
	//admin post update
exports.update = function(req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'后台更新数据',
				movie:movie
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

	if(id !== 'undefined'){
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
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				//重定向到详情页
				res.redirect('/movie/'+movie._id)
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