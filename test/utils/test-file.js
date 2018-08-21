/* eslint-env node, mocha */
'use strict';

const IdentifyStream = require('../../lib/index.js');
const fs = require('fs');
const { expect } = require('chai');
const { WritableStreamBuffer } = require('stream-buffers');

function testFile(path, expected, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  const inputStream = fs.createReadStream(path);
  const identifyStream = new IdentifyStream(options);
  const writableStreamBuffer = new WritableStreamBuffer();

  identifyStream.on('complete', (type) => {
    //expect(Object.keys(type).length).to.equal(Object.keys(expected).length);
    for (var key in expected) {
      expect(type[key]).to.equal(expected[key]);
    }
    cb();
  });

  inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
}

module.exports = testFile;
