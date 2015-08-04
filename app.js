var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var connect = require('connect');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session)
var cookieParser = require('cookie-parser');
var morgan = require('morgan') //日志 代替express.logger
var port = process.env.PORT || 3000;
var app = express();

//连接数据库
var dbUrl = "mongodb://localhost/moviePro";
mongoose.connect(dbUrl)

app.set('views','./app/views/pages');
app.set('view engine','jade');
//app.set('port',3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//格式化提交表单

// session and cookie Parser
app.use(cookieParser());
app.use(session({
	secret:'Moive',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}));

if('development' === app.get('env')){
	app.set('showStackError',true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

require('./config/routes')(app)
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment = require('moment')//格式化时间

app.listen(port);
console.log('server started on port ' + port);

