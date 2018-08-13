/* eslint-env node, mocha */

const { expect } = require('chai');
const IdentifyStream = require('../index.js');
const { Readable } = require('stream');
const fs = require('fs');
const { WritableStreamBuffer } = require('stream-buffers');
const testFile = require('./utils/test-file');

describe('IdentifyStream', function() {
  it('Should load.', function() {
    expect(typeof IdentifyStream).to.equal('function');
  });

  it('Can be instantiated', function() {
    const identifyStream = new IdentifyStream();
    expect(identifyStream).to.be.an.instanceof(IdentifyStream);
  });

  it('Should not modify content', function(done) {
    var path = './test/fixtures/fixture.7z';
    var inputStream = fs.createReadStream(path);
    var identifyStream = new IdentifyStream();
    var writableStreamBuffer = new WritableStreamBuffer();

    writableStreamBuffer.on('finish', function() {
      var src = fs.readFileSync(path);
      var dest = writableStreamBuffer.getContents();
      expect(src.equals(dest)).to.be.true;
      done();
    });

    inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
  });

  it('Stops taking samples once identified', function(done) {
    const identifyStream = new IdentifyStream();
    const inputStream = fs.createReadStream('./test/fixtures/fixture.pseudo');
    const writableStreamBuffer = new WritableStreamBuffer();
    var sampleLength;

    identifyStream.on('identified', () => {
      sampleLength = identifyStream.sample.length;
    });

    identifyStream.on('end', () => {
      expect(sampleLength).to.equal(identifyStream.sample.length);
      done();
    });

    inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
  });

  it('Should emit TypeError when reading from an object stream.', function() {
    const source = new Readable({
      objectMode: true,
      read() {}
    });
    const identifyStream = new IdentifyStream();

    source.pipe(identifyStream);
    source.push({ a: 1 });

    identifyStream.on('error', function(err) {
      expect(err).to.be.an.instanceof(TypeError);
    });
  });
});

describe('File types', function() {
  it('Can identify 7z file.', function(done) {
    testFile('./test/fixtures/fixture.7z', 'application/x-7z-compressed', done);
  });

  it('Can identify avi file.', function(done) {
    testFile('./test/fixtures/fixture.avi', 'video/avi', done);
  });

  it('Can identify avi file.', function(done) {
    testFile('./test/fixtures/fixture.avi', 'video/avi', done);
  });

  it('Can identify bmp file.', function(done) {
    testFile('./test/fixtures/fixture.bmp', 'image/bmp', done);
  });

  it('Can identify bz2 file.', function(done) {
    testFile('./test/fixtures/fixture.bz2', 'application/bzip2', done);
  });

  it('Can identify exe file.', function(done) {
    testFile('./test/fixtures/fixture.exe', 'application/octet-stream', done);
  });

  it('Can identify flac file.', function(done) {
    testFile('./test/fixtures/fixture.flac', 'audio/flac', done);
  });

  it('Can identify 87a gif file.', function(done) {
    testFile('./test/fixtures/fixture-87a.gif', 'image/gif', done);
  });

  it('Can identify 89a gif file.', function(done) {
    testFile('./test/fixtures/fixture-89a.gif', 'image/gif', done);
  });

  it('Can identify gz file.', function(done) {
    testFile('./test/fixtures/fixture.gz', 'application/gzip', done);
  });

  it('Can identify ico file.', function(done) {
    testFile('./test/fixtures/fixture.ico', 'image/ico', done);
  });

  it('Can identify jpg file.', function(done) {
    testFile('./test/fixtures/fixture.jpg', 'image/jpeg', done);
  });

  it('Can identify exif jpg file.', function(done) {
    testFile('./test/fixtures/fixture-exif.jpg', 'image/jpeg', done);
  });

  it('Can identify jpf file.', function(done) {
    testFile('./test/fixtures/fixture.jpf', 'image/jpx', done);
  });

  it('Can identify m4a file.', function(done) {
    testFile('./test/fixtures/fixture.m4a', 'audio/m4a', done);
  });

  it('Can identify mov file.', function(done) {
    testFile('./test/fixtures/fixture.mov', 'video/quicktime', done);
  });

  it('Can identify ID3v1 mp3 file.', function(done) {
    testFile('./test/fixtures/fixture-ID3v1.mp3', 'audio/mpeg', done);
  });

  it('Can identify ID3v2 mp3 file.', function(done) {
    testFile('./test/fixtures/fixture-ID3v2.mp3', 'audio/mpeg', done);
  });

  it('Can identify mp4 file.', function(done) {
    testFile('./test/fixtures/fixture.mp4', 'video/mp4', done);
  });

  it('Can identify ogg file.', function(done) {
    testFile('./test/fixtures/fixture.ogg', 'audio/ogg', done);
  });

  it('Can identify pdf file.', function(done) {
    testFile('./test/fixtures/fixture.pdf', 'application/pdf', done);
  });

  it('Can identify png file.', function(done) {
    testFile('./test/fixtures/fixture.png', 'image/png', done);
  });

  it('Can identify psd file.', function(done) {
    testFile('./test/fixtures/fixture.psd', 'image/psd', done);
  });

  it('Can identify rtf file.', function(done) {
    testFile('./test/fixtures/fixture.rtf', 'application/rtf', done);
  });

  it('Can identify little endian tif file.', function(done) {
    testFile('./test/fixtures/fixture-little-endian.tif', 'image/tiff', done);
  });

  it('Can identify big endian tif file.', function(done) {
    testFile('./test/fixtures/fixture-big-endian.tif', 'image/tiff', done);
  });

  it('Can identify wav file.', function(done) {
    testFile('./test/fixtures/fixture.wav', 'audio/wav', done);
  });

  it('Can identify webm file.', function(done) {
    testFile('./test/fixtures/fixture.webm', 'video/webm', done);
  });

  it('Can identify webp file.', function(done) {
    testFile('./test/fixtures/fixture.webp', 'image/webp', done);
  });

  it('Can identify xz file.', function(done) {
    testFile('./test/fixtures/fixture.xz', 'application/x-xz', done);
  });

  it('Can identify zip file.', function(done) {
    testFile('./test/fixtures/fixture.zip', 'application/zip', done);
  });

  it('Can identify empty zip file.', function(done) {
    testFile('./test/fixtures/fixture-empty.zip', 'application/zip', done);
  });

  it('Can identify spanning zip file.', function(done) {
    testFile('./test/fixtures/fixture.z01', 'application/zip', done);
  });

  it('Returns \'unknown\' when no signatures match', function(done) {
    testFile('./test/fixtures/fixture.pseudo', 'unknown', done);
  });

  it('Should emit an error when file is empty.', function(done) {
    const inputStream = fs.createReadStream('./test/fixtures/fixture.empty');
    const identifyStream = new IdentifyStream();
    const writableStreamBuffer = new WritableStreamBuffer();

    identifyStream.on('error', function(err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });

    inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
  });
});

describe('Custom file types', function() {
  it('Should identify a custom format', (done) => {
    testFile('./test/fixtures/fixture.pseudo', 'application/x-custom', {
      formats: [
        {
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '6f54b1f31487',
            offset: 0
          }]
        }
      ]
    }, done);
  });

  it('Should identify a custom format from a list.', (done) => {
    testFile('./test/fixtures/fixture.pseudo', 'application/x-custom', {
      formats: [
        {
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '6f54b1f42598',
            offset: 0
          }]
        },
        {
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '6f54b1f31487',
            offset: 0
          }]
        }
      ]
    }, done);
  });

  it('Should identify a standard format when provided with custom formats.', (done) => {
    testFile('./test/fixtures/fixture.7z', 'application/x-7z-compressed', {
      formats: [
        {
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '7fa92c',
            offset: 131104
          }]
        }
      ]
    }, done);
  });

  it('Should identify a custom format with a signature outside the usual area.', (done) => {
    testFile('./test/fixtures/fixture.pseudo', 'application/x-custom', {
      formats: [
        {
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '7fa92c',
            offset: 131104
          }]
        }
      ]
    }, done);
  });

});
