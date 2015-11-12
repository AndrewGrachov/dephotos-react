const React = require('react');
const SearchItem = require('./searchItem.jsx');
const api = require('../../utils/api');
var styleContent = require('../../../../build/css/search/main.css');

module.exports = React.createClass({
	statics: {
		load: function (query) {
			return {
				query: {
					dp_command: 'search',
					dp_search_limit: 100,
					dp_search_query: 'cats',
					dp_search_nudity: 1
				},
				name: 'searchPage'
			}
		}
	},
	getDefaultProps: function () {
		return {
			data: {
				searchQuery: 'Pretty+woman',
				searchPage: {
					result: __DATA__.searchPage ? __DATA__.searchPage.result : []
				}
			}
		}
	},
	getInitialState: function () {
		return {
			loading: !this.hasData()
		};
	},
	componentDidMount: function () {
		if (this.hashData()) {
			var query = this.constructor.load();
			api.get(query, function (err, result) {
				if (!err) {

				}
			}.bind(this));
		}
	},
	hasData: function () {
		return this.props.data.searchPage.result.length;
	},
	render: function () {
		debugger;
		var searchItems = this.props.data.searchPage.result.map(function (props) {
			return <SearchItem {...props} />
		});
		return (<div>
			<style type="text/css">{styleContent}</style>
			<div>
				<input className="big-input" ref="searchInput"/>
				<button className="search-button">Search</button>
			</div>
			<div className="search-container">
				{searchItems}
			</div>
		</div>)
	}
});