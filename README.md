# moviePro
学习nodejs movie 第二期
[学习视频](http://www.imooc.com/learn/197)


### grunt 自动重启

npm install grunt --save-dev

npm install grunt-contrib-watch --save-dev
npm install grunt-nodemon --save-dev
npm install grunt-concurrent --save-dev

编写*gruntfile.js*

### 加密
md5

npm install bcrypt --save


### 测试：

	localhost:3000/
	localhost:3000/movie/1
	localhost:3000/admin/movie
	localhost:3000/admin/list


### 遇到问题

使用 express 4.x以后：
>	require('connect-mongo')(express)
	throw new Error('Most middlewa...

解决[办法](https://cnodejs.org/topic/5350c12d1969a7b22a65ea6f)：


	书中是基于Express 3.x 版本进行开发的, 在 Express 升级到4.x 之后session中间件已经不再内置了, 需要自己安装, 并且使用方式也不一样了.
	Express 4.x 中使用方式改为了这样:

	var session = require('express-session');
	var MongoStore = require('connect-mongo')(session);

	app.use(session({
	    secret: 'foo',
	    store: new MongoStore(options)
	}));

	而 Express 3.x 中是这样的:

	var MongoStore = require('connect-mongo')(express);

	app.use(express.session({
	    secret: 'foo',
	    store: new MongoStore(options)
	}));



