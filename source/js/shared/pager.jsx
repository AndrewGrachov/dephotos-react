const React = require('react');
function noop() {}
module.exports = React.createClass({
	displayName: 'Pager',
	getDefaultProps: function () {
		return {
			count: 1,
			onChange: function () {},
			defaultLimit: 20
		};
	},
	getInitialState: function () {
		return {
			count: this.props.count,
			activePage: this.props.activePage || 1,
			startPage: this.props.startPage || 1
		};
	},
	componentWillReceiveProps: function (props) {
		this.setState({
			count: props.count
		});
	},
	onPageButtonClick: function (pageNumber, e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		}
		this.setState({
			activePage: pageNumber
		});
		this.props.onChange(pageNumber);
	},
	next: function (e) {
		var newStartPage = this.state.startPage + this.props.defaultLimit;
		if (newStartPage > this.state.count) {
			newStartPage = this.state.count - this.state.startPage;
		}
		this.setState({
			startPage: newStartPage
		});
		this.onPageButtonClick(newStartPage, e);
	},
	previous: function (e) {
		var newStartPage = this.state.startPage - this.props.defaultLimit;
		if (newStartPage < 0) {
			newStartPage = 1;
		}
		this.setState({
			startPage: newStartPage
		});
		this.onPageButtonClick(newStartPage, e);
	},
	jumpTo: function (e) {
		if (e.charCode === 13) {
			var value = parseInt(this.refs.jumpTo.value);
			this.setState({
				startPage: value
			});
			this.onPageButtonClick(value, e);
		}
	},
	changePageInput: function (e) {
		this.setState({activePage: e.target.value})
	},
	getEndPage: function () {
		var offset = this.state.startPage + this.props.defaultLimit + 1;
		if (offset < this.state.count) {
			return this.state.startPage + this.props.defaultLimit - 1;
		}
		return endPage = this.state.count - this.state.activePage;
	},
	render: function () {
		var buttons = [];
		var endPage = this.getEndPage();

		for (var i = this.state.startPage; i < endPage; i++) {
			var className = this.state.activePage == i ? 'active' : ''
			buttons.push(
				<li key={i} className={className}>
					<a href='#' onClick={this.onPageButtonClick.bind(this, i)}>{i}</a>
				</li>)
		}
		return (
			<nav>
				<div className="col-xs-2 float-none">
					<input className="input-small" value={this.state.activePage} type="number" ref="jumpTo" onKeyPress={this.jumpTo} onChange={this.changePageInput} />
				</div>
				<div>
					<ul className="pagination">
						<li>
							<a href="#" aria-label="Previous" className="prev-button" onClick={this.previous}>
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						{buttons}
						<li>
							<a href="#" className="next-button" aria-label="Next" onClick={this.next}>
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>)
	}
});