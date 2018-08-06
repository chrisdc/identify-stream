/* eslint-env node, mocha */

const fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var IdentifyStream = require('../index.js');
var fixtures;

describe('identify-stream', function() {
  before(function(done) {
    fs.readdir('./test/fixtures', function(err, files) {
      fixtures = files;
    });

    done();
  });

  it('Should load.', function() {
    expect(typeof IdentifyStream).to.equal('function');
    //done();
  });

  describe('Identify Types', function() {
    var inputStream,
        outputStream,
        indentifyStream;

    beforeEach() {
      var indentifyStream = new IdentifyStream();
      var inputStream = fs.createReadStream('./test/fixtures/fixture.jpg');
      var outputStream = fs.createWriteStream('output.flac');
    }

    it('Should identify a jpg.', function(done) {
      var indentifyStream = new IdentifyStream();
      var inputStream = fs.createReadStream('./test/fixtures/fixture.jpg');
      var outputStream = fs.createWriteStream('output.flac');

      indentifyStream.on('identified', (type) => {
        expect(type).to.equal('jpeg');
        done();
      });

      inputStream.pipe(indentifyStream).pipe(outputStream);
    });

    it('Should identify a gif.', function(done) {
      var indentifyStream = new IdentifyStream();
      var inputStream = fs.createReadStream('./test/fixtures/fixture.gif');
      var outputStream = fs.createWriteStream('output.flac');

      indentifyStream.on('identified', (type) => {
        expect(type).to.equal('gif');
        done();
      });

      inputStream.pipe(indentifyStream).pipe(outputStream);
    });
  });
});
