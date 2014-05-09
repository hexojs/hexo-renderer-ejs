var ejs = require('ejs'),
  _ = require('lodash');

hexo.extend.renderer.register('ejs', 'html', function(data, locals){
  return ejs.render(data.text, _.extend({filename: data.path}, locals));
}, true);