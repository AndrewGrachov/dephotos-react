var request = require('superagent');
var qs = require('querystring');

module.exports = {
	get: function (params, callback) {
		request.get('/api?' + qs.stringify(params))
				.end(function (err, res) {
					return callback(null, res.body);
				});
	}
}
