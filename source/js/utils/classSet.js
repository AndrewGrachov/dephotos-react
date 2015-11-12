module.exports = function() {
	var args = arguments;
	return Object.keys(args).map(function(key) {
		return args[key];
	}).reduce(function(classNames, arg) {
		if (typeof arg === 'string') {
			classNames.push(arg);
		} else if (typeof arg === 'object') {
			Object.keys(arg).forEach(function(key) {
				if (arg[key]) {
					classNames.push(key);
				}
			});
		}
		return classNames;
	}, []).join(' ');
};