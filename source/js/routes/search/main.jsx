const React = require('react');
const SearchItem = require('./searchItem.jsx');
const api = require('../../utils/api');
const Pager = require('../../shared/pager.jsx');

var styleContent = require('../../../../build/css/search/main.css');

module.exports = React.createClass({
	displayName: 'SearchPage',
	statics: {
		load: function (query) {
			return {
				query: {
					dp_command: 'search',
					dp_search_limit: 30,
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
					searchPage: __DATA__.searchPage
				}
			}
		}
		return {};
	},
	getInitialState: function () {
		return {
			loading: !!this.props.data.searchPage.result.length,
			items: this.props.data.searchPage.result,
			searchProps: this.constructor.load().query,
			page: 1,
			limit: 30,
			skip: 0,
			count: this.props.data.searchPage.count,
			pagesCount: Math.floor(this.props.data.searchPage.count / 100)
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
					items: response.result,
					count: response.count,
					pagesCount: Math.floor(response.count / this.state.limit)
				});
			}
		}.bind(this));
	},
	componentDidMount: function () {
		if (!this.hasData()) {
			var query = this.constructor.load().query;
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
		this.setState({
			searchProps: query
		});
		this.load(query);
	},
	setPage: function (pageNumber) {
		var query = this.state.searchProps;
		query.dp_search_offset = pageNumber * this.state.limit;
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
						<input ref="searchInput" id="searchInput"/>
					</div>
					<button className="btn btn-default btn-search" onClick={this.search}>Search</button>
				</div>
				<div className="search-container clearfix">
					{searchItems}
				</div>
				<Pager count={this.state.pagesCount} onChange={this.setPage}/>
			</div>
		)
	}
});