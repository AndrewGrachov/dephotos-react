var api = require('./api.js');
var qs = require('querystring');

module.exports = function(req, state, __data__, callback) {
	var queryString = '';
	if (Object.keys(state.query).length) {
		queryString = '?' + qs.stringify(state.query);
	}
	var paths = state.routes.filter(function(route) {
		return (route.handler.getDataPaths && route.handler.getDataPaths(state.params, state.query, queryString));
	}).reduce(function(_paths, route) {
		var routePaths = route.handler.getDataPaths(state.params, state.query, queryString);
		var routeName = route.name;
		if (typeof routePaths === 'object') {
			Object.keys(routePaths).forEach(function(pathName) {
				if (!__data__[routeName] || (__data__[routeName] && !__data__[routeName][pathName])){
					_paths[routeName + '/' + pathName] = '/api' + routePaths[pathName];
				}
			});
			return _paths;
		}
		if (!__data__[routeName]) {
			_paths[routeName] = '/api' + routePaths;
		}
		return _paths;
	}, {});

	if ((process.browser && appStore.getToken()) || (req && (req.cookies.token || req.headers.token))) {
		paths.user = '/api/users';
	}
	var links = state.routes.reduce(function(_links, route) {
		return getAllStyleLinks(route.handler, _links);
	}, []);

	if (!Object.keys(paths).length) {
		return callback(null, __data__, links);
	}

	var url = '/multifetch?' + qs.stringify(paths);
	api(req).get(url, function(err, res) {

		if (err) {
			return callback(err);
		}

		res = res.body || res;

		var errResKey = Object.keys(res).filter(function(key) {
			return Object.keys(paths).indexOf(key) !== -1;
		}).reduce(function(prevKey, key) {
			if (res[key].statusCode > res[prevKey].statusCode) {
				return key;
			}
			return prevKey;
		});

		if (res[errResKey].statusCode > 200) {
			return callback(res[errResKey]);
		}

		var data = __data__;
		Object.keys(res).forEach(function(key) {
			var parts = key.split('/');
			if (parts.length === 2) {
				if (!data[parts[0]]) {
					data[parts[0]] = {};
				}
				data[parts[0]][parts[1]] = res[key].body;
			} else {
				data[key] = res[key].body;
			}
		});

		return callback(null, data, links);
	});
};