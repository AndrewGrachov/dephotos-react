const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const routes = require('./routes.jsx');
window.__DATA__ = window.__DATA__ || {};
var createHistory = require('history').createHistory
ReactDOM.render(React.createElement(Router, {routes: routes, history: createHistory()}), document.getElementById('app'));