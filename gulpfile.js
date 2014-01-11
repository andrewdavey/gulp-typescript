var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var watch = require('gulp-watch');


gulp.task('default', function() {
	gulp.run('lint', 'test', 'watch');
});

gulp.task('lint', function() {
	gulp.run('lint:app', 'lint:test');
});

gulp.task('lint:app', function () {
	gulp.src('lib/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint:test', function () {
	gulp.src('test/**/*.js')
		.pipe(jshint('test/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
	gulp.src('test/**/*.js', { read: false })
		.pipe(mocha({
			reporter: 'spec',
			globals: {
				expect: require('chai').expect
			}
		}))
		.on('error', gutil.log);
});

gulp.task('npm:test', function() {
	gulp.run('lint', 'test');
});

gulp.task('watch', function() {
	gulp.src(['lib/**/*.js', 'test/**/*.js'], { read: false })
		.pipe(watch(function(events, cb) {
			gulp.run('lint', 'test', cb);
		}));
});
