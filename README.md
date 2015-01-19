# [EJS] renderer

Add support for [EJS].

## Install

``` bash
$ npm install hexo-renderer-ejs --save
```

## Minification
To enable minification add html_minifier to your _config.yml
```
html_minifier:
```
You can pass more options from https://github.com/kangax/html-minifier. By default it has following options:
``` js
{
	removeComments: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true,
	removeEmptyAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyJS: true,
	minifyCSS: true
}
```

[EJS]: https://github.com/visionmedia/ejs