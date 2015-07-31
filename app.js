var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

app.set('views','./views/pages');
app.set('view engine','jade');
//app.set('port',3000);
app.use(bodyParser.json());//格式化提交表单
app.use(express.static(path.join(__dirname,'public')));
app.listen(port);

console.log('server started on port ' + port);

//index page
app.get('/',function(req,res){
 res.render('index',{
 	title:'首页',
 	movies:[{
 		title:'机械战警',
 		_id:1,
 		poster:'http://img0.bdstatic.com/img/image/6446027056db8afa73b23eaf953dadde1410240902.jpg'
 	},{
 		title:'星际旅行',
 		_id:2,
 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg'
 	}]
 });
});

//detail page
app.get('/movie/:id',function(req,res){
 res.render('detail',{
 	title:'详情',
 	movie:{
 		doctor:'张艺谋',
 		country:'中国',
 		title:'满城尽带黄金甲',
 		year:2013,
 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg',
 		language:'中文',
 		flash:'http://player.youku.com/player.php/sid/XMTI5NTExODEyOA==/v.swf',
 		summary:'描述了xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 	}
 });
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



//list page
app.get('/admin/',function(req,res){
 res.render('list',{
 	title:'列表',
 	movies:[{
 		doctor:'张艺谋',
 		country:'中国',
 		title:'满城尽带黄金甲',
 		year:2013,
 		poster:'http://tupian.qqjay.com/u/2013/0628/33_1730_2.jpg',
 		language:'中文',
 		flash:'',
 		summary:'描述了xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 	}]
 });
});