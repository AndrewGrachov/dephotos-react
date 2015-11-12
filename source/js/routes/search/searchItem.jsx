const React = require('react');
const Image = require('../../shared/Image.jsx');
module.exports = React.createClass({
	render: function () {
		return (
			<div className="search-card">
				<Image src={this.props.medium_thumbnail}/>
			</div>)
	}
});