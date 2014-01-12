var FS = require('fs');
var expect = require('chai').expect;
var gutil = require('gulp-util');
var typescript = require('../../lib/app.js');
var Q = require('q');


describe('gulp-typescript', function() {

	it('generates JavaScript source from TypeScript source', function(done) {
		// Arrange
		var fakeFile = new gutil.File({
			base: 'test/fixtures',
			cwd: 'test',
			path: 'test/fixtures/lambda.ts',
			contents: FS.readFileSync('test/fixtures/lambda.ts')
		});

		var stream = typescript();

		// Assert
		stream.once('data', function(data) {
			// Test that command executed
			var outputSource = String(data.contents);
			Q.nfcall(FS.readFile, 'test/expected/lambda.js', 'utf8')
				.done(function(expectedSource) {
					expect(outputSource).to.equal(expectedSource);
					done();
				});
		});

		// Act
		stream.write(fakeFile);
		stream.end();
	});
});
