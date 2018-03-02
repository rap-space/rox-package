import { createElement, render } from 'rax';
import Page from 'rox-page';

window.define('@page/data', function(require, exports, module) {
  var metaData = {
    charset: 'utf-8',
    title: 'TestPage',
    spma: 'a',
    spmb: 'b',
    env: 'development'
  };

  module.exports = {
    metaData: metaData
  };
});

render(<Page />);
