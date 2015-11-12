var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

var App = require('./app.jsx');
var Dashboard = require('./dashboard.jsx');
var Index = require('./index.jsx');
var Search = require('./routes/search/main.jsx');

module.exports = [
	<Route path="/" component={App} name="app">
		<IndexRoute component={Index} />
		<Route component={Search} path="search"/>
		<Route component={Dashboard} path="dashboard"/>
	</Route>
];