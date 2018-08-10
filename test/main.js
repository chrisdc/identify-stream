/* eslint-env node, mocha */

const chai = require('chai');
const expect = chai.expect;
const IdentifyStream = require('../index.js');
const { Readable } = require('stream');
//var fixtures;

describe('identify-stream', function() {
  it('Should load.', function() {
    expect(typeof IdentifyStream).to.equal('function');
  });

  it('Emits an \'identified\' event.');
  it('Emits an \'identified\' event when file is shorter then sample length.');
  it('Passes the complete, original content');

  it('Should emit TypeError when reading from an object stream.', function() {
    const source = new Readable({
      objectMode: true,
      read() {}
    });
    const identifyStream = new IdentifyStream();

    source.pipe(identifyStream);

    source.push({
      a: 1,
      b: 2
    });

    identifyStream.on('error', function(err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });
});
