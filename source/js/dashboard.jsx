const React = require('react');
const Link = require('react-router').Link;
const Translate = require('react-translate-component');

module.exports = React.createClass({
	displayName: 'Dashboard',
	render: function () {
		return (<div>
			<div className="h2"><Translate content='dashboard'/></div>
			<ul className="nav">
				<li>
					<Link to="/dashboard/view1" activeClassName="active" className="btn btn-default">
						<Translate content='nested_view1'/>
					</Link>
				</li>
				<li>
					<Link to="/dashboard/view2" activeClassName="active" className="btn btn-default">
						<Translate content='nested_view2'/>
					</Link>
				</li>
			</ul>
			<div>
				{this.props.children}
			</div>
		</div>)
	}
});