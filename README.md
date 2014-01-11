(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

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

gulp.src('./src/*.ext')
	.pipe(typescript({
		msg: 'Hello Gulp!'
	}))
	.pipe(gulp.dest('./dist'));
```

## API

### typescript(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-typescript
[npm-image]: https://badge.fury.io/js/gulp-typescript.png

[travis-url]: http://travis-ci.org/jedmao/gulp-typescript
[travis-image]: https://secure.travis-ci.org/jedmao/gulp-typescript.png?branch=master

[depstat-url]: https://david-dm.org/jedmao/gulp-typescript
[depstat-image]: https://david-dm.org/jedmao/gulp-typescript.png
