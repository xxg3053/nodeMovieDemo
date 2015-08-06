/**
 * movie控制器
 */
var Movie = require('../models/movie');
var Catetory = require('../models/catetory');
var _ = require('underscore');

	//admin new page
exports.new = function(req,res){
	 res.render('catetory_admin',{
	 	title:'后台分类录入',
	 	catetory:{
	 		name:'',
	 	}
	 });
}


// admin post catetory
exports.save = function(req,res){
	var _catetory = req.body.catetory;
	var catetory = new Catetory(_catetory)
		catetory.save(function(err,catetory){
			if(err){
				console.log(err)
			}
			//重定向到详情页
			res.redirect('/admin/catetory/list')
		})
}

//user list page
exports.list = function(req,res){
	Catetory.fetch(function(err,catetories){
		if(err){
			console.log(err)
		}
		res.render('catetory_list',{
			title:'分类列表',
			catetories:catetories
		})
	})
}
