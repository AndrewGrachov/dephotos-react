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
var NestedView1 = require('./routes/dashboard/view1.jsx');
var NestedView2 = require('./routes/dashboard/view2.jsx');

module.exports = [
	<Route path="/" component={App} name="app">
		<IndexRoute component={Index} />
		<Route component={Search} path="search"/>
		<Route component={Dashboard} path="dashboard">
			<Route component={NestedView1} path="view1"/>
			<Route component={NestedView2} path="view2"/>
		</Route>
	</Route>
];