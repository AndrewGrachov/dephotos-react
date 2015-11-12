var sanitize = require('sanitize-caja');
module.exports = function (content) {
	var sanitized = sanitize(content);
	return sanitized;
};