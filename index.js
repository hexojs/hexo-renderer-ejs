var ejs = require('ejs');
var _ = require('lodash');
var minifier = {
	minify: null,
	enabled: false,
	options: {
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
	},
	extend: function (options) {
		_.extend(minifier.options, options);
	},
	run: function (html) {
		return this.minify(html, this.options);
	}
};

hexo.extend.renderer.register('ejs', 'html', function(data, locals){
	function render() {
  return ejs.render(data.text, _.extend({filename: data.path}, locals));
	}
	if ('html_minifier' in locals.config) {
		if (!minifier.minify) {
			minifier.minify = require('html-minifier').minify;
			minifier.extend(locals.config.html_minifier);
		}
		return minifier.run(render());
	} else {
		return render();
	}
}, true);