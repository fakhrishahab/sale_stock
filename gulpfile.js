var gulp	= require('gulp'),
	sass 	= require('gulp-sass'),
	plumber = require('gulp-plumber'),
	gutil 	= require('gulp-util'),
	uglify 	= require('gulp-uglify'),
	minify 	= require('gulp-minify'),
	protractor = require('gulp-protractor').protractor,
	webdriver_standalone = require("gulp-protractor").webdriver_standalone,
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	minifyEjs = require('gulp-minify-ejs'),
	createServer = require('./server');

process.env.NODE_ENV = 'production';
var ENV 	= process.env.NODE_ENV || 'development';

gulp.task('sass', function(){
	gulp.src('dev/assets/style/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		// .pipe(sass.sync().on('Error', sass.logError))
		.pipe(ENV === 'production' ? minifyCss() : gutil.noop())
		.pipe(gulp.dest('dist/assets/./style'))
})

gulp.task('html', function(){
	gulp.src('dev/view/**/*.ejs')
		.pipe(plumber())
		.pipe(ENV === 'production' ? minifyEjs() : gutil.noop())
		.pipe(gulp.dest('dist/view'))
})

gulp.task('script', function(){
	gulp.src('dev/script/**/*.js')
		.pipe(plumber())
		// .pipe(ENV === 'production' ? minify({mangle:true}) : gutil.noop())
		.pipe(gulp.dest('dist/script/'))
})

gulp.task('images', function(){
	gulp.src('dev/assets/images/**/*.*')
		.pipe(gulp.dest('dist/assets/images'))
})

gulp.task('lib', function(){
	gulp.src('dev/lib/**/*.*')
		.pipe(gulp.dest('dist/lib'))
})

gulp.task('fonts', function(){
	gulp.src('dev/assets/fonts/**/*.*')
		.pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('create_server', function(){
	createServer;
})

gulp.task('default', ['create_server', 'sass', 'html', 'script', 'images', 'lib', 'fonts', 'watch']);

gulp.task('webdriver', webdriver_standalone);

gulp.task('watch', function(){
	gulp.watch('dev/assets/style/**/*.*', ['sass'])
	gulp.watch('dev/script/**/*.*', ['script'])
	gulp.watch('dev/view/**/*.ejs', ['html'])
	gulp.watch('dev/lib/**/*.*', ['lib'])
})

gulp.task('protractor', ['create_server'], function(done){
	gulp.src(['test/e2e/*.js'])
		.pipe(protractor({
			configFile: "test/protractor.config.js",
			args:['--baseUrl','http://localhost:8000']
		}))
		.on('end',done);
})

