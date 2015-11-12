const React = require('react');
var cs = require('../utils/classSet.js');

module.exports = React.createClass({
	displayName: 'Image',
	getDefaultProps: function() {
		return {
			alt: '',
			className: ''
		};
	},
	getInitialState: function() {
		return {
			loaded: false
		};
	},
	componentDidMount: function() {
		var src = this.refs.img.getDOMNode().src;
		var img = new Image();
		img.onload = this.imageOnLoad;
		img.src = src;
	},
	imageOnLoad: function() {
		if (this.isMounted()) {
			this.setState({
				loaded: true
			});
			if (typeof this.props.onLoad === 'function') {
				this.props.onLoad();
			}
		}
	},
	render: function() {
		var imageClassName = cs(this.props.className, 'image-preload', {
			'image-loaded': this.state.loaded,
			'image-not-loaded': !this.state.loaded
		});
		var imgProps = {
			ref: 'img',
			alt: this.props.alt,
			src: this.props.src,
			className: imageClassName
		};
		return (
			<div>
				<img {...imgProps} />
			</div>
		);
	}
});