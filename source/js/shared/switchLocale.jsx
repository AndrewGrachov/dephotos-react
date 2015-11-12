const counterpart = require('counterpart');
const React = require('react');
const request = require('superagent');

module.exports = React.createClass({
	handleChange: function(e) {
		var locale = e.target.value;
		if (__DATA__.localization[locale]) {
			return counterpart.setLocale(e.target.value);
		}
		request.get('/locale/' + locale)
				.end(function (err, res) {
					counterpart.registerTranslations(locale, res.body);
					counterpart.setLocale(locale);
					__DATA__.localization[locale] = res.body;
				});
	},
	render: function() {
		return (
		<p>
		<span>Switch Locale:</span>

		<select defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
		<option>en</option>
		<option>de</option>
		<option>ru</option>
		</select>
		</p>
		);
	}
});