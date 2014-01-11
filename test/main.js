'use strict';

var fs = require('fs');
var es = require('event-stream');
var expect = require('chai').expect;
var gutil = require('gulp-util');
var typescript = require('../lib/app.js');


describe('gulp-typescript', function() {

	var expectedFile = new gutil.File({
		path: 'test/expected/hello.txt',
		cwd: 'test/',
		base: 'test/expected',
		contents: fs.readFileSync('test/expected/hello.txt')
	});

	it('produces expected file via buffer', function(done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/hello.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.readFileSync('test/fixtures/hello.txt')
		});

		var stream = typescript('World');

		stream.on('error', function(err) {
			expect(err).to.exist;
			done(err);
		});

		stream.on('data', function(newFile) {

			expect(newFile).to.exist;
			expect(newFile.contents).to.exist;

			expect(newFile.contents).to.deep.equal(expectedFile.contents);
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('errors on stream', function(done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/hello.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/hello.txt')
		});

		var stream = typescript('World');

		stream.on('error', function (err) {
			expect(err).to.exist;
			done();
		});

		stream.on('data', function(newFile) {
			newFile.contents.pipe(es.wait(function(err) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});

	/*
	it('produces expected file via stream', function (done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/hello.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/hello.txt')
		});

		var stream = typescript('World');

		stream.on('error', function(err) {
			expect(err).to.exist;
			done();
		});

		stream.on('data', function (newFile) {

			expect(newFile).to.exist;
			expect(newFile.contents).to.exist;

			newFile.contents.pipe(es.wait(function(err, data) {
				expect(err).to.not.exist;
				expect(data).to.deep.equal(expectedFile.contents);
				done();
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
	*/
});
