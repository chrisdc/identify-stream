/* eslint-env node, mocha */

const fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var IdentifyStream = require('../index.js');

function test(path, expected, cb) {
  var indentifyStream = new IdentifyStream();
  var inputStream = fs.createReadStream(path);

  indentifyStream.on('identified', (type) => {
    expect(type).to.equal(expected);
    cb();
  });

  inputStream.pipe(indentifyStream);
}

describe('Identify file types', function() {
  it('Can identify 7z file.', function(done) {
    test('./test/fixtures/fixture.7z', 'application/x-7z-compressed', done);
  });

  it('Can identify avi file.', function(done) {
    test('./test/fixtures/fixture.avi', 'video/avi', done);
  });

  it('Can identify bmp file.', function(done) {
    test('./test/fixtures/fixture.bmp', 'image/bmp', done);
  });

  it('Can identify bz2 file.', function(done) {
    test('./test/fixtures/fixture.bz2', 'application/bzip2', done);
  });

  it('Can identify exe file.', function(done) {
    test('./test/fixtures/fixture.exe', 'application/octet-stream', done);
  });

  it('Can identify flac file.', function(done) {
    test('./test/fixtures/fixture.flac', 'audio/flac', done);
  });

  it('Can identify 87a gif file.', function(done) {
    test('./test/fixtures/fixture-87a.gif', 'image/gif', done);
  });

  it('Can identify 89a gif file.', function(done) {
    test('./test/fixtures/fixture-89a.gif', 'image/gif', done);
  });

  it('Can identify gz file.', function(done) {
    test('./test/fixtures/fixture.gz', 'application/gzip', done);
  });

  it('Can identify ico file.', function(done) {
    test('./test/fixtures/fixture.ico', 'image/ico', done);
  });

  it('Can identify jpg file.', function(done) {
    test('./test/fixtures/fixture.jpg', 'image/jpeg', done);
  });

  it('Can identify exif jpg file.', function(done) {
    test('./test/fixtures/fixture-exif.jpg', 'image/jpeg', done);
  });

  it('Can identify jpf file.', function(done) {
    test('./test/fixtures/fixture.jpf', 'image/jpx', done);
  });

  it('Can identify m4a file.', function(done) {
    test('./test/fixtures/fixture.m4a', 'audio/m4a', done);
  });

  it('Can identify mov file.', function(done) {
    test('./test/fixtures/fixture.mov', 'video/quicktime', done);
  });

  it('Can identify ID3v1 mp3 file.', function(done) {
    test('./test/fixtures/fixture-ID3v1.mp3', 'audio/mpeg', done);
  });

  it('Can identify ID3v2 mp3 file.', function(done) {
    test('./test/fixtures/fixture-ID3v2.mp3', 'audio/mpeg', done);
  });

  it('Can identify mp4 file.', function(done) {
    test('./test/fixtures/fixture.mp4', 'video/mp4', done);
  });

  it('Can identify ogg file.', function(done) {
    test('./test/fixtures/fixture.ogg', 'audio/ogg', done);
  });

  it('Can identify pdf file.', function(done) {
    test('./test/fixtures/fixture.pdf', 'application/pdf', done);
  });

  it('Can identify png file.', function(done) {
    test('./test/fixtures/fixture.png', 'image/png', done);
  });

  it('Can identify psd file.', function(done) {
    test('./test/fixtures/fixture.psd', 'image/psd', done);
  });

  it('Can identify rtf file.', function(done) {
    test('./test/fixtures/fixture.rtf', 'application/rtf', done);
  });

  it('Can identify little endian tif file.', function(done) {
    test('./test/fixtures/fixture-little-endian.tif', 'image/tiff', done);
  });

  it('Can identify big endian tif file.', function(done) {
    test('./test/fixtures/fixture-big-endian.tif', 'image/tiff', done);
  });

  it('Can identify wav file.', function(done) {
    test('./test/fixtures/fixture.wav', 'audio/wav', done);
  });

  it('Can identify webm file.', function(done) {
    test('./test/fixtures/fixture.webm', 'video/webm', done);
  });

  it('Can identify webp file.', function(done) {
    test('./test/fixtures/fixture.webp', 'image/webp', done);
  });

  it('Can identify xz file.', function(done) {
    test('./test/fixtures/fixture.xz', 'application/x-xz', done);
  });

  it('Can identify zip file.', function(done) {
    test('./test/fixtures/fixture.zip', 'application/zip', done);
  });

  it('Can identify empty zip file.', function(done) {
    test('./test/fixtures/fixture-empty.zip', 'application/zip', done);
  });

  it('Can identify spanning zip file.', function(done) {
    test('./test/fixtures/fixture.z01', 'application/zip', done);
  });

  it('Returns \'unknown\' when no signatures match');
});
