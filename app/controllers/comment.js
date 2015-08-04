/**
 * Comment控制器
 */
var Comment = require('../models/comment');
var _ = require('underscore');

	// admin post movie
exports.save = function(req,res){
	var _comment = req.body.comment;
	var movieId = _comment.movie
	if(_comment.cid){
		//回复
		Comment.findById(_comment.cid,function(err,comment){
			var reply = {
				from:_comment.from,
				to:_comment.to,
				content:_comment.content
			}

			comment.reply.push(reply)

			comment.save(function(err,comment){
				if(err){
					console.log(err)
				}
				//重定向到详情页
				res.redirect('/movie/'+movieId)
			})
		})
	}
	else{
		var comment = new Comment(_comment)
		comment.save(function(err,comment){
			if(err){
				console.log(err)
			}
			//重定向到详情页
			res.redirect('/movie/'+movieId)
		})
	}
	
}

