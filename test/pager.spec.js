require('./testdom')('<html><head></head><body><div id="app"></div></body></html>');
const expect = require('chai').expect;
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Pager = require('../source/js/shared/pager.jsx');
describe('when testing pager', function () {
	var pager;
	var testParent = {
		onChange: function (value) {
			this.value = value;
		}
	};
	var props = {
		count: 40,
		onChange: testParent.onChange.bind(testParent),
		defaultLimit: 10
	};

	before(function () {
		pager = ReactDOM.render(React.createElement(Pager, props), document.getElementById('app'));
	});

	it('should render pager and set default state', function () {
		expect(pager.state.count).to.equal(props.count);
		expect(pager.state.activePage).to.equal(1);
		expect(pager.state.startPage).to.equal(1);
	});

	it('should properly resolve last rendered number', function () {
		var endPage = pager.getEndPage();
		expect(endPage).to.equal(10);
	});

	it('should change active page state and callback onChange handler', function () {
		var pagination = TestUtils.findRenderedDOMComponentWithClass(pager, 'pagination');
		var fifthButton = [].slice.call(pagination.childNodes).filter(function (child) {
			return [].slice.call(child.childNodes)[0].innerHTML == 5;
		})[0].childNodes[0];
		TestUtils.Simulate.click(fifthButton);
		expect(pager.state.activePage).to.equal(5);
		expect(testParent.value).to.equal(5);
	});

	it('should load next 10 pages', function () {
		var nextButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'next-button');
		TestUtils.Simulate.click(nextButton);
		expect(pager.state.activePage).to.equal(10);
		expect(pager.state.startPage).to.equal(10);
	});

	it('should load previous 10 pages', function () {
		var previousButton = TestUtils.findRenderedDOMComponentWithClass(pager, 'prev-button');
		TestUtils.Simulate.click(previousButton);
		expect(pager.state.activePage).to.equal(1);
		expect(pager.state.startPage).to.equal(1);
	});
});