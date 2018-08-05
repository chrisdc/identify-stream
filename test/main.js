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

  it('Should load.', function(done) {
    expect(typeof IdentifyStream).to.equal('object');
    done();
  });

  it('Should identify custom files.');

  it('Should reject unknown file type.');
});
