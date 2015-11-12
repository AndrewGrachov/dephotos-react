var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var nodemon = require('gulp-nodemon');

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

gulp.task('start', function () {
	nodemon({
		script: 'app.js',
		ext: 'js html jsx',
		env: { 'NODE_ENV': process.env.NODE_ENV || 'development' }
  	});
});

gulp.task('default', ['scripts', 'start']);