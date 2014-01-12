# gulp-typescript [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> TypeScript plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-typescript` as a development dependency:

```shell
npm install --save-dev gulp-typescript
```

Then, add it to your `gulpfile.js`:

```javascript
var typescript = require('gulp-typescript');

gulp.src('./src/*.ts', { read: false })
	.pipe(typescript({
		module: 'commonjs',
		target: 'ES5'
	}))
	.pipe(gulp.dest('./dist'));
```

## API

### typescript(options)

#### options.declaration / options.d
Type: `Boolean`
Default: `false`

Generates corresponding .d.ts file.

#### options.mapRoot
Type: `String`

Specifies the location where debugger should locate map files instead of generated locations.

#### options.module / options.m
Type: `String`

Specify module code generation: `commonjs` or `amd`

#### options.noImplicitAny
Type: `Boolean`
Default: `false`

Warn on expressions and declarations with an implied `any` type.

#### options.noResolve
Type: `Boolean`
Default: `false`

Skip resolution and preprocessing.

#### options.out
Type: `String`

Concatenate and emit output to single file.

#### options.outDir
Type: `String`

Redirect output structure to the directory.

#### options.removeComments
Type: `Boolean`
Default: `false`

Do not emit comments to output.

#### options.sourcemap
Type: `Boolean`
Default: `false`

Generates corresponding .map file.

#### options.sourceRoot
Type: `String`

Specifies the location where debugger should locate TypeScript files instead of source locations.

#### options.target / options.t
Type: `String`
Default: `ES3`

Specify ECMAScript target version: 'ES3' or 'ES5'

#### options.@&lt;file&rt;
Note: File is specified in option key.

Insert command line options and files from a file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-typescript
[npm-image]: https://badge.fury.io/js/gulp-typescript.png

[travis-url]: http://travis-ci.org/jedmao/gulp-typescript
[travis-image]: https://secure.travis-ci.org/jedmao/gulp-typescript.png?branch=master

[depstat-url]: https://david-dm.org/jedmao/gulp-typescript
[depstat-image]: https://david-dm.org/jedmao/gulp-typescript.png
