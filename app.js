var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore'); //更新字段
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/moviePro')

app.set('views','./views/pages');
app.set('view engine','jade');
//app.set('port',3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//格式化提交表单
app.use(express.static(path.join(__dirname,'public')));

app.locals.moment = require('moment')//格式化时间

app.listen(port);

console.log('server started on port ' + port);

//index page
app.get('/',function(req,res){
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
 // res.render('index',{
 // 	title:'首页',
 // 	//测试数据
 // 	movies:[{
 // 		title:'机械战警',
 // 		_id:1,
 // 		poster:'http://img0.bdstatic.com/img/image/6446027056db8afa73b23eaf953dadde1410240902.jpg'
 // 	},{
 // 		title:'星际旅行',
 // 		_id:2,
 // 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg'
 // 	}]
 // });
});

//detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		res.render('detail',{
			title:'详情 ' + movie.title,
			movie:movie
		})
	})
 // 测试数据
 // res.render('detail',{
 // 	title:'详情',
 // 	movie:{
 // 		doctor:'张艺谋',
 // 		country:'中国',
 // 		title:'满城尽带黄金甲',
 // 		year:2013,
 // 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg',
 // 		language:'中文',
 // 		flash:'http://player.youku.com/player.php/sid/XMTI5NTExODEyOA==/v.swf',
 // 		summary:'描述了xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 // 	}
 // });
});


//admin page
app.get('/admin/movie',function(req,res){
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
});
//admin post update
app.get('/admin/movie/update/:id',function(req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'后台更新数据',
				movie:movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new',function(req,res){
	console.log('new ');
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
})

//list page
app.get('/admin/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'列表',
			movies:movies
		})
	})

  // 测试数据
 // res.render('list',{
 // 	title:'列表',
 // 	movies:[{
 // 		doctor:'张艺谋',
 // 		country:'中国',
 // 		title:'满城尽带黄金甲',
 // 		year:2013,
 // 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg',
 // 		language:'中文',
 // 		flash:'',
 // 		summary:'描述了xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 // 	}]
 // });
});