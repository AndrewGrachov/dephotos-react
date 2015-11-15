module.exports = function(markup) {
	if (typeof document !== 'undefined')  {
		return;
	}
	var jsdom = require('jsdom').jsdom;
	global.document = jsdom(markup || '');
	global.window = document.defaultView;
	global.console.debug = function (str) {
		console.log(str);
	}
	global.window.document = global.document;
	global.navigator = {
		userAgent: 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0'
	};
	global.process = process;
	global.location = { reload: function () {} };
	global.Image = window.Image;
	global.requestAnimationFrame = function (callback) {
		callback();
	};
};