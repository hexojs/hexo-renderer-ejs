'use strict';

require('chai').should();
const fs = require('hexo-fs');
const pathFn = require('path');

describe('EJS renderer', () => {
  const r = require('../lib/renderer');

  it('default', async () => {
    const body = 'Hello <%= name %>';
    const result = await r({ text: body }, { name: 'world' });

    result.should.eql('Hello world');
  });

  it('comments', async () => {
    const body = ['Comment <%# hidden %>'].join('\n');

    const result = await r({text: body});
    result.should.eql('Comment ');
  });

  it('include', async () => {
    const body = '<%- include(\'test\') %>';
    const path = pathFn.join(__dirname, 'include_test', 'index.ejs');
    const includePath = pathFn.join(path, '../test.ejs');
    const includeBody = 'include body';

    await fs.writeFile(includePath, includeBody);

    const render = await r.compile({ text: body, path });
    const result = await render({ text: body, path });
    result.should.eql(includeBody);

    await fs.rmdir(pathFn.join(__dirname, 'include_test'));
  });

  it('compile', async () => {
    const body = 'Hello <%= name %>';
    const render = await r.compile({ text: body });
    const result = await render({ name: 'world' });

    result.should.eql('Hello world');
  });
});
