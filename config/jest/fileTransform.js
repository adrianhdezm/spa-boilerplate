'use strict';

const path = require('path');
const camelcase = require('camelcase');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(src));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFileName = camelcase(path.parse(filename).name, {
        pascalCase: true
      });
      const componentName = `Svg${pascalCaseFileName}`;

      return `
        exports.__esModule = true;
        const React = require('react');
        exports.default = function ${componentName}(props) {
          return React.createElement('svg', Object.assign({}, props), null);
        };
      `;
    }
    return `module.exports = ${assetFilename};`;
  }
};
