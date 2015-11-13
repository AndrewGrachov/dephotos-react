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
			<div className="container">
				<style type="text/css">{styleContent.toString()}</style>
				<div className="hero-unit">
					<h1><Translate content='dep_react_test'/></h1>
				</div>
				<div className="collapse">
					<SwitchLocale />
					<div>
						<ul className="nav">
							<li>
								<Link activeClassName="active" to="/search" className="btn btn-default"><Translate content='search' /></Link>
							</li>
							<li>
								<Link activeClassName="active" to='/dashboard' className="btn btn-default"><Translate content='dashboard' /></Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="main">
					{this.props.children}
				</div>
			</div>
		);
	}
});