var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');

gulp.task('scripts', function () {
	return gulp.src('./source/js/client.jsx')
		//.pipe(named())
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'client.js'
			},
			module: {
				loaders: [
					{
						test: /\.jsx$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel!jsx-loader?harmony'
					},
					{
						test: /\.css$/,
						loader: "css-loader?root=."
					}
				]
			},
		}))
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('default', ['scripts']);