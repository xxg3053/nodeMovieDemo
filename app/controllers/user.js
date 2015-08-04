/**
 * user 控制器
 */
var User = require('../models/user');
//signup
exports.signup = function(req,res) {
	var _user = req.body.user
	//req.params.user

	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/signin')
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				//console.log(user);
				res.redirect('/');
			})
		}
	})	
}

exports.showSignin = function(req,res){
	res.render('signin',{
			title:'用户登录'
		})
}

exports.showSignup = function(req,res){
	res.render('signup',{
			title:'用户注册'
		})
}

//user signin
exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		//console.log("==="+ user)
		if(!user){
			return res.redirect('/signup')
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
				//console.log('signin fail')
				return res.redirect('/signin')
			}
		})
	})
}

//user list page
exports.list = function(req,res){
	// var user = req.session.user;
	// if(!user){
	// 	return res.redirect('/signin')
	// }
	// if(user.role > 10){
	// }
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'用户列表',
			users:users
		})
	})
}


	//user logout
exports.logout = function(req,res){
	delete req.session.user 
	//delete app.locals.user
	res.redirect('/')
}


//登录中间件
exports.siginRequired = function(req,res,next){
	var user = req.session.user
	if(!user){
		return res.redirect('/signin')
	}
	next()
}

//管理员中间件
exports.adminRequired = function(req,res,next){
	var user = req.session.user
	if(user.role <= 10){
		return res.redirect('/signin')
	}

	next()
}