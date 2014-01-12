var fs = require('fs');
var exec = require('gulp-exec');
var gutil = require('gulp-util');
var map = require('map-stream');
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
			return this.emit(new PluginError(PLUGIN_NAME, 'Options must be an object or a string!'));
	}

	return map(function (file, cb) {
		var stream = exec('"node_modules/.bin/tsc" <%= options.options %> <%= file.path %>', {
			options: options || ''
		});

		stream.once('end', function() {
			var outputFile = new gutil.File(file);
			outputFile.path = outputFile.path.replace(/\.ts$/, '.js');
			fs.readFile(outputFile.path, function(err, outputSource) {
				if (err) {
					cb(err, file);
					return;
				}
				outputFile.contents = outputSource;
				cb(err, outputFile);
			});
		});

		stream.write(file);
		stream.end();
	});
}

module.exports = gulpTypeScript;
