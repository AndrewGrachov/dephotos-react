require('node-jsx').install({extension: '.jsx', harmony: true});
require('./extensions');
const qs = require('querystring');
const config = require('config');
const Koa = require('koa');
var route = require('koa-path')();
const app = new Koa();
const Jade = require('koa-jade');
const request = require('co-request');
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

var locales = {
	'en': require('./locales/en.js'),
	'ru': require('./locales/ru.js')
};

// response

app.use(route('/api', function* (next) {
	this.query.dp_apikey = config.api_key;
	this.set('Content-Type', 'application/json');
	// do stuff
	switch (this.request.method) {
		case 'GET':
			var url = config.api_url + '?' + qs.stringify(this.query);
			this.body = (yield request.get(url)).body
	}
}));

app.use(route('/locale/:lang', function* (next) {
	this.set('Content-Type', 'application/json');
	// do stuff
	switch (this.request.method) {
		case 'GET':
			this.body = locales[this.params.lang];
	}
}));


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