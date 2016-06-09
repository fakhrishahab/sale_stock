var gulp	= require('gulp'),
	sass 	= require('gulp-sass'),
	plumber = require('gulp-plumber'),
	createServer = require('./server');

gulp.task('sass', function(){
	gulp.src('dev/assets/style/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sass.sync().on('Error', sass.logError))
		.pipe(gulp.dest('dist/assets/./style'))
})

gulp.task('create_server', function(){
	createServer;
})

gulp.task('default', ['create_server', 'sass', 'watch']);

gulp.task('watch', function(){
	gulp.watch('dev/assets/style/**/*.*', ['sass'])
})