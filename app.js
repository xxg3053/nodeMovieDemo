var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore'); //更新字段
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;
var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/moviePro')

app.set('views','./views/pages');
app.set('view engine','jade');
//app.set('port',3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//格式化提交表单

// session and cookie Parser
app.use(cookieParser());
app.use(session({
	secret:'Moive'
}));

app.use(express.static(path.join(__dirname,'public')));

app.locals.moment = require('moment')//格式化时间

app.listen(port);

console.log('server started on port ' + port);

//index page
app.get('/',function(req,res){
	console.log('user in session:');
	console.log(req.session.user);

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
});

//signup
app.post('/user/signup',function(req,res) {
	var _user = req.body.user
	//req.params.user

	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/')
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				//console.log(user);
				res.redirect('/admin/userlist');
			})
		}
	})
	
});
//user signin
app.post('/user/signin',function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/')
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				//console.log('signin success')
				req.session.user = user;
				return res.redirect('/')
			}
			else{
				console.log('password is not matched')
			}
		})
	})
})

//user list page
app.get('/admin/userList',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'用户列表',
			users:users
		})
	})
})

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
});

// delete movie
app.delete('/admin/list',function(req,res){
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
})