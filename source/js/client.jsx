const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const routes = require('./routes.jsx');
const counterpart = require('counterpart');
const Translate = require('react-translate-component');
window.process = require('process');

window.__DATA__ = window.__DATA__ || {};
counterpart.registerTranslations(__DATA__.locale, __DATA__.localization[__DATA__.locale]);
var createHistory = require('history').createHistory
ReactDOM.render(React.createElement(Router, {routes: routes, history: createHistory()}), document.getElementById('app'));