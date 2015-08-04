/**
 * 用户模式
 */

var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');//加密盐 windows安装有误，暂时不实现
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	//0: normal user
	//1: verified user 邮件激活
	//2: professonal user
	//3-9
	// > 10: admin
	// > 50: super admin
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	// bcrypt 安装有误，暂时不实现
	// bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
	// 	if(err) return next(err);

	// 	bcrypt.hash(user,password,salt,function(err,hash){
	// 		if(err) return next(err);
	// 		user.password = hash
	// 		next()
	// 	})
	// })
	next()
})
//实例方法
UserSchema.methods = {
	comparePassword:function(_password,cb){
		// bcrypt.compare(_password,this.password,function(err,isMatch){
		// 	if(err) return cb(err)

		// 	cb(null,isMatch)
		// })
		if(_password == this.password){
			cb(null,true)
		}
		else{
			cb(null,false)
		}
	}
}

//静态方法，对象可以直接调用
UserSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = UserSchema
