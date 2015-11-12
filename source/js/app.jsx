var React = require('react');
var createFragment = require('react-addons-create-fragment');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var styleContent = require('../../build/css/app.css');
module.exports = React.createClass({
	displayName: 'App',
	render: function() {
		return (
			<div>
				<style type="text/css">{styleContent.toString()}</style>
				<div className="hero-unit">
					<h1>Depositphotos React test</h1>
				</div>
				<div>
					<ul className="nav">
						<li>
							<Link activeClassName="active" to="/search">Search</Link>
						</li>
						<li>
							<Link activeClassName="active" to='/dashboard'>Dashboard</Link>
						</li>
					</ul>
				</div>
				<div className="main">
					{this.props.children}
				</div>
			</div>
		);
	}
});