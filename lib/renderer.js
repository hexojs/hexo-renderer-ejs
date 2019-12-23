'use strict';

const ejs = require('ejs');

function ejsRenderer(data, locals) {
  return ejs.render(data.text, Object.assign({ filename: data.path }, locals), { async: true });
}

ejsRenderer.compile = function(data) {
  return ejs.compile(data.text, { filename: data.path }, { async: true });
};

module.exports = ejsRenderer;
