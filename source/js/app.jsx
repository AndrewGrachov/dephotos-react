const React = require('react');
const createFragment = require('react-addons-create-fragment');
const RouteHandler = require('react-router').RouteHandler;
const Link = require('react-router').Link;
const Translate = require('react-translate-component');
const SwitchLocale = require('./shared/switchLocale.jsx');
var styleContent = require('../../build/css/app.css');
module.exports = React.createClass({
	displayName: 'App',
	render: function() {
		return (
			<div>
				<style type="text/css">{styleContent.toString()}</style>
				<div className="hero-unit">
					<h1><Translate content='dep_react_test'/></h1>
				</div>
				<SwitchLocale />
				<div>
					<ul className="nav">
						<li>
							<Link activeClassName="active" to="/search"><Translate content='search' /></Link>
						</li>
						<li>
							<Link activeClassName="active" to='/dashboard'><Translate content='dashboard' /></Link>
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