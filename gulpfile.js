const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
require('node-jsx').install({extension: '.jsx', harmony: true});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('scripts', function () {
	var webpackConfig = {
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
	};
	if (process.env.NODE_ENV !== 'development' || process.env.SKIP_WATCH) {
		webpackConfig.watch = false;
	}
	return gulp.src('./source/js/client.jsx')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('lint', function () {
	return gulp.src(['**/*.js','**/*.jsx','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', function () {
	return gulp.src('test/*.spec.js')
			.pipe(mocha());
});

gulp.task('start', function () {
	nodemon({
		script: 'app.js',
		ext: 'js html jsx',
		env: { 'NODE_ENV': process.env.NODE_ENV || 'development' }
  	});
});

gulp.task('default', ['scripts', 'start']);