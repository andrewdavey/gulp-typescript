var FS = require('fs');
var exec = require('gulp-exec');
var gutil = require('gulp-util');
var map = require('map-stream');
var Q = require('q');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-typescript';

function parseOptions(options) {
	var args = [];
	Object.keys(options).forEach(function (key) {
		var value = options[key];
		if (!value) {
			return;
		}
		if (key === '@') {
			args.push(key + value);
			return;
		}
		var dashes = '-';
		if (key.length !== 1) {
			dashes += '-';
		}
		args.push(dashes + key);
		if (typeof value !== 'boolean') {
			args.push(value);
		}
	});
	return args.join(' ');
}

function gulpTypeScript(options) {

	switch (typeof options) {
	case 'object':
		options = parseOptions(options);
		break;
	case 'string':
	case 'undefined':
		break;
	default:
		throw new PluginError(PLUGIN_NAME, 'Options must be an object or a string!');
	}

	return map(function(file, cb) {
		var stream = exec('"node_modules/.bin/tsc" <%= options.options %> <%= file.path %>', {
			options: options || ''
		});

		var outputFile = new gutil.File(file);
		outputFile.path = outputFile.path.replace(/\.ts$/, '.js');

		var markForDeletion;
		FS.exists(outputFile.path, function(exists) {
			markForDeletion = !exists;
			stream.write(file);
			stream.end();
		});

		stream.once('end', function() {
			Q.nfcall(FS.readFile, outputFile.path).then(function(outputSource) {
				outputFile.contents = outputSource;
				if (markForDeletion) {
					cleanupOutput().then(onSuccess, onFail);
				} else {
					onSuccess();
				}
			}, onFail);
		});

		function cleanupOutput() {
			var cleaning = new Q.defer();
			FS.unlink(outputFile.path, function(err) {
				if (err) {
					cleaning.reject(err);
				} else {
					cleaning.resolve();
				}
			});
			return cleaning.promise;
		}

		function onSuccess() {
			cb(null, outputFile);
		}

		function onFail(err) {
			cb(new PluginError(PLUGIN_NAME, err.message), file);
		}

	});
}

module.exports = gulpTypeScript;
