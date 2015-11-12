require('node-jsx').install({extension: '.jsx', harmony: true});
require('./extensions');
const Koa = require('koa');
const app = new Koa();
const Jade = require('koa-jade')
const jade = new Jade({
	viewPath: './views'
});
var serverRender = require('./source/js/server.jsx');
var sanitize = require('./source/js/utils/sanitize');
app.use(require('koa-static')('build'));
app.use(function *(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});
app.use(jade.middleware)

// response

app.use(function *(){
	var locale = 'en';
	var self = this;
	var result = yield serverRender(this.request, this.response, locale);
	var content = result.content;
	var data = result.data;
	data.locale = locale;
	data = sanitize(JSON.stringify(data));
	self.render('layout', {pageContent: content, componentData: data, env: process.env.NODE_ENV});
});

app.listen(3000);
console.log('Listening at 3000');