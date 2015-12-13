'use strict';

var should = require('chai').should(); // eslint-disable-line
var fs = require('hexo-fs');
var pathFn = require('path');

describe('EJS renderer', function() {
  var r = require('../lib/renderer');

  it('default', function() {
    var body = [
      'Hello <%= name %>'
    ].join('\n');

    var result = r({text: body}, {name: 'world'});
    result.should.eql('Hello world');
  });

  it('include', function() {
    var body = [
      '<% include test %>'
    ].join('\n');

    var path = pathFn.join(__dirname, 'include_test', 'index.ejs');
    var includePath = pathFn.join(path, '../test.ejs');
    var includeBody = 'include body';

    return fs.writeFile(includePath, includeBody).then(function() {
      var result = r({
        text: body,
        path: path
      });

      result.should.eql(includeBody);
    }).finally(function() {
      return fs.unlink(includePath);
    });
  });
});
