'use strict';

const should = require('chai').should(); // eslint-disable-line
const fs = require('hexo-fs');
const pathFn = require('path');

describe('EJS renderer', () => {
  const r = require('../lib/renderer');

  it('default', () => {
    const body = 'Hello <%= name %>';
    const result = r({text: body}, {name: 'world'});

    result.should.eql('Hello world');
  });

  it('comments', () => {
    const body = [
      'Comment <%# hidden %>'
    ].join('\n');

    const result = r({text: body});
    result.should.eql('Comment ');
  });

  it('include', () => {
    const body = '<% include test %>';
    const path = pathFn.join(__dirname, 'include_test', 'index.ejs');
    const includePath = pathFn.join(path, '../test.ejs');
    const includeBody = 'include body';

    return fs.writeFile(includePath, includeBody).then(() => {
      const result = r({
        text: body,
        path: path
      });

      result.should.eql(includeBody);
    }).finally(() => {
      return fs.unlink(includePath);
    });
  });

  it('compile', () => {
    const body = 'Hello <%= name %>';
    const render = r.compile({text: body});
    const result = render({
      name: 'world'
    });

    result.should.eql('Hello world');
  });
});
