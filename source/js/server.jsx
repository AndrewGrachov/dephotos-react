const Router = require('react-router');
const routes = require('./routes.jsx');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const request = require('co-request');
const RoutingContext = require('react-router').RoutingContext;
const config = require('config');
const parallel = require('co-parallel');
const qs = require('querystring');
const co = require('co');
const counterpart = require('counterpart');

var locales = {
	en: require('../../locales/en'),
	ru: require('../../locales/ru')
};

function *requestApi(url) {
	console.log('GET %s', url);
	return JSON.parse((yield request.get(url)).body);
}

module.exports = function*(req, res, locale) {
	var thunk = function (callback) {
		counterpart.registerTranslations(locale, locales[locale]);
		Router.match({routes: routes, location: req.url}, co.wrap(function*(err, redirectLocation, renderProps) {
			if (err) {
				return callback(err);
			}
			var paths = renderProps.routes.map(function (route) {
				if (route.component && route.component.load) {
					return route.component.load(req.url);
				}
				return null;
			}).filter(function (path) {
				return path !== null;
			});

			var urls = paths.map(function (params) {
				params.query.dp_apikey = config.api_key;
				return requestApi(config.api_url + '?' + qs.stringify(params.query));
			});
			var keys = paths.map(function (params) {
				return params.name;
			});
			var start = new Date;
			var response = yield parallel(urls);
			var ms = new Date - start;
			console.log('api request took ' + ms + ' milliseconds');
			var data = {};
			keys.forEach(function (key, index) {
				data[key] = response[index];
			});
			data.localization = {};
			data.localization[locale] = locales[locale];
			var customProps = {
				data: data
			};
			renderProps.createElement = function (Component, props) {
				return React.createElement(Component, {...props, ...customProps});
			}
			try {
				var html = ReactDOMServer.renderToString(React.createElement(RoutingContext, renderProps));
			} catch(ex) {
				console.log('ex:', ex);
			}
			callback(null, {content: html, data: data});
		}));
	}
	return yield thunk;
};