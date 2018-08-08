/* eslint-env node, mocha */

const fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var IdentifyStream = require('../index.js');
//var fixtures;

describe('identify-stream', function() {
  /*before(function(done) {
    fs.readdir('./test/fixtures', function(err, files) {
      fixtures = files;
    });

    done();
  });*/

  it('Should load.', function() {
    expect(typeof IdentifyStream).to.equal('function');
  });

  describe('Identify Types', function() {
    var indentifyStream;

    beforeEach(function() {
      indentifyStream = new IdentifyStream();
    });

    it('Should identify a jpg.', function(done) {
      var inputStream = fs.createReadStream('./test/fixtures/fixture.jpg');

      indentifyStream.on('identified', (type) => {
        expect(type).to.equal('jpeg');
        done();
      });

      inputStream.pipe(indentifyStream);
    });

    it('Should identify a gif.', function(done) {
      var inputStream = fs.createReadStream('./test/fixtures/fixture-87a.gif');

      indentifyStream.on('identified', (type) => {
        expect(type).to.equal('gif');
        done();
      });

      inputStream.pipe(indentifyStream);
    });
  });
});
