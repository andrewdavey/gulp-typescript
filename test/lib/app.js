var fs = require('fs');
var expect = require('chai').expect;
var gutil = require('gulp-util');
var typescript = require('../../lib/app.js');


describe('gulp-typescript', function() {

	it('should generate JavaScript source from TypeScript source', function (done) {
		// Arrange
		var fakeFile = new gutil.File({
			base: 'test/fixtures',
			cwd: 'test',
			path: 'test/fixtures/lambda.ts',
			contents: fs.readFileSync('test/fixtures/lambda.ts')
		});

		var stream = typescript();

		// Assert
		stream.once('end', function (/*actualFile*/) {
			// Test that command executed
			var options = { encoding: 'utf8' };
			fs.readFile('test/fixtures/lambda.js', options, function(err, outputSource) {
				expect(err).to.be.null;
				fs.readFile('test/expected/lambda.js', options, function(err2, expectedSource) {
					expect(err2).to.be.null;
					expect(outputSource).to.equal(expectedSource);
					done();
				});
			});
		});

		// Act
		stream.write(fakeFile);
		stream.end();
	});
});
