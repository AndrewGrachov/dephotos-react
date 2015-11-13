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
		if (process.browser) {
			console.log('__DATA__:', __DATA__);
			__DATA__.searchPage = __DATA__.searchPage || { result: []};
			return {
				data: {
					searchQuery: 'cats',
					searchPage: {
						result: __DATA__.searchPage.result
					}
				}
			}
		}
		return {};
	},
	getInitialState: function () {
		return {
			loading: !!this.props.data.searchPage.result.length,
			items: this.props.data.searchPage.result,
			searchProps: this.constructor.load().query
		};
	},
	load: function (query, callback) {
		this.setState({
			loading: true
		});
		api.get(query, function (err, response) {
			if (!err) {
				this.setState({
					loading: false,
					items: response.result
				});
			}
		}.bind(this));
	},
	componentDidMount: function () {
		console.log('hashdata:', this.hasData());
		if (!this.hasData()) {
			var query = this.constructor.load().query;
			console.log('query:', query);
			this.load(query);
		}
	},
	hasData: function () {
		return this.state.items.length;
	},
	search: function () {
		var searchValue = this.refs.searchInput.value.replace(new RegExp(' ', 'g'), '+');
		var query = JSON.parse(JSON.stringify(this.state.searchProps));
		query.dp_search_query = searchValue;
		this.load(query);
	},
	render: function () {
		var searchItems = this.state.items.map(function (props, index) {
			return <SearchItem {...props} key={index} />
		});
		return (
				<div className="search-container">
			<style type="text/css">{styleContent.toString()}</style>
			<div>
				<div className="form-group">
					<label htmlFor="searchInput" className="sr-only">Password</label>
					<input className="form-control" ref="searchInput" id="searchInput"/>
				</div>
				<button className="btn btn-default btn-search" onClick={this.search}>Search</button>
			</div>
			<div className="search-container">
				{searchItems}
			</div>
		</div>
		)
	}
});