/* eslint-env node, mocha */
'use strict';

const { expect } = require('chai');
const IdentifyStream = require('../lib/index.js');
const fs = require('fs');
const { WritableStreamBuffer } = require('stream-buffers');
const testFile = require('./utils/test-file');

describe('IdentifyStream', () => {
  describe('Setup', () => {
    it('Should load.', () => {
      expect(typeof IdentifyStream).to.equal('function');
    });

    it('Can be instantiated', () => {
      const identifyStream = new IdentifyStream();
      expect(identifyStream).to.be.an.instanceof(IdentifyStream);
    });
  });

  describe('Streaming', () => {
    it('Should emit an error when file is empty.', (done) => {
      const inputStream = fs.createReadStream('./test/fixtures/fixture.empty');
      const identifyStream = new IdentifyStream();
      const writableStreamBuffer = new WritableStreamBuffer();

      identifyStream.on('error', function(err) {
        expect(err).to.be.an.instanceof(Error);
        done();
      });

      inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
    });

    it('Should not modify content', (done) => {
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

    it('Stops taking samples once complete', (done) => {
      const identifyStream = new IdentifyStream();
      const inputStream = fs.createReadStream('./test/fixtures/fixture.pseudo');
      const writableStreamBuffer = new WritableStreamBuffer();
      var sampleLength;

      identifyStream.on('complete', () => {
        sampleLength = identifyStream.sample.length;
      });

      identifyStream.on('end', () => {
        expect(sampleLength).to.equal(identifyStream.sample.length);
        done();
      });

      inputStream.pipe(identifyStream).pipe(writableStreamBuffer);
    });
  });


  describe('File type support', () => {
    it('Can identify 7z file.', function(done) {
      testFile('./test/fixtures/fixture.7z', {
        name: '7-zip Archive',
        extension: '7z',
        mime: 'application/x-7z-compressed'
      }, done);
    });

    it('Can identify avi file.', (done) => {
      testFile('./test/fixtures/fixture.avi', {
        name: 'AVI Video',
        extension: 'avi',
        mime: 'video/avi'
      }, done);
    });

    it('Can identify bmp file.', (done) => {
      testFile('./test/fixtures/fixture.bmp', {
        name: 'BMP Image',
        extension: 'bmp',
        mime: 'image/bmp'
      }, done);
    });

    it('Can identify bz2 file.', (done) => {
      testFile('./test/fixtures/fixture.bz2', {
        name: 'BZIP2 Archive',
        extension: 'bz2',
        mime: 'application/bzip2'
      }, done);
    });

    it('Can identify exe file.', (done) => {
      testFile('./test/fixtures/fixture.exe', {
        name: 'Executable File',
        extension: 'exe',
        mime: 'application/octet-stream'
      }, done);
    });

    it('Can identify flac file.', (done) => {
      testFile('./test/fixtures/fixture.flac', {
        name: 'FLAC Audio',
        extension: 'flac',
        mime: 'audio/flac'
      }, done);
    });

    it('Can identify 87a gif file.', (done) => {
      testFile('./test/fixtures/fixture-87a.gif', {
        name: 'GIF Image',
        extension: 'gif',
        mime: 'image/gif',
        subtype: '87a'
      }, done);
    });

    it('Can identify 89a gif file.', (done) => {
      testFile('./test/fixtures/fixture-89a.gif', {
        name: 'GIF Image',
        extension: 'gif',
        mime: 'image/gif',
        subtype: '89a'
      }, done);
    });

    it('Can identify gz file.', (done) => {
      testFile('./test/fixtures/fixture.gz', {
        name: 'GZIP Archive',
        extension: 'gz',
        mime: 'application/gzip'
      }, done);
    });

    it('Can identify ico file.', (done) => {
      testFile('./test/fixtures/fixture.ico', {
        name: 'Icon File',
        extension: 'ico',
        mime: 'image/ico'
      }, done);
    });

    it('Can identify jpg file.', (done) => {
      testFile('./test/fixtures/fixture.jpg', {
        name: 'JPEG Image',
        extension: 'jpg',
        mime: 'image/jpeg',
        subtype: 'standard'
      }, done);
    });

    it('Can identify exif jpg file.', (done) => {
      testFile('./test/fixtures/fixture-exif.jpg', {
        name: 'JPEG Image',
        extension: 'jpg',
        mime: 'image/jpeg',
        subtype: 'exif'
      }, done);
    });

    it('Can identify jpf file.', (done) => {
      testFile('./test/fixtures/fixture.jpf', {
        name: 'JPEG 2000 Image',
        extension: 'jpf',
        mime: 'image/jpx'
      }, done);
    });

    it('Can identify m4a file.', (done) => {
      testFile('./test/fixtures/fixture.m4a', {
        name: 'MPEG 4 Audio',
        extension: 'm4a',
        mime: 'audio/m4a'
      }, done);
    });

    it('Can identify mov file.', (done) => {
      testFile('./test/fixtures/fixture.mov', {
        name: 'QuickTime Movie',
        extension: 'mov',
        mime: 'video/quicktime'
      }, done);
    });

    it('Can identify ID3v1 mp3 file.', (done) => {
      testFile('./test/fixtures/fixture-ID3v1.mp3', {
        name: 'MP3 Audio',
        extension: 'mp3',
        mime: 'audio/mpeg',
        subtype: 'ID3v1'
      }, done);
    });

    it('Can identify ID3v2 mp3 file.', (done) => {
      testFile('./test/fixtures/fixture-ID3v2.mp3', {
        name: 'MP3 Audio',
        extension: 'mp3',
        mime: 'audio/mpeg',
        subtype: 'ID3v2'
      }, done);
    });

    it('Can identify mp4 file.', (done) => {
      testFile('./test/fixtures/fixture.mp4', {
        name: 'MP4 Media File',
        extension: 'mp4',
        mime: 'video/mp4'
      }, done);
    });

    it('Can identify ogg file.', (done) => {
      testFile('./test/fixtures/fixture.ogg', {
        name: 'OGG Audio',
        extension: 'ogg',
        mime: 'audio/ogg'
      }, done);
    });

    it('Can identify pdf file.', (done) => {
      testFile('./test/fixtures/fixture.pdf', {
        name: 'PDF File',
        extension: 'pdf',
        mime: 'application/pdf'
      }, done);
    });

    it('Can identify png file.', (done) => {
      testFile('./test/fixtures/fixture.png', {
        name: 'PNG Image',
        extension: 'png',
        mime: 'image/png'
      }, done);
    });

    it('Can identify psd file.', (done) => {
      testFile('./test/fixtures/fixture.psd', {
        name: 'PSD Image',
        extension: 'psd',
        mime: 'image/psd'
      }, done);
    });

    it('Can identify rtf file.', (done) => {
      testFile('./test/fixtures/fixture.rtf', {
        name: 'RTF Document',
        extension: 'rtf',
        mime: 'application/rtf'
      }, done);
    });

    it('Can identify little endian tif file.', (done) => {
      testFile('./test/fixtures/fixture-little-endian.tif', {
        name: 'TIFF Image',
        extension: 'tif',
        mime: 'image/tiff',
        subtype: 'little endian'
      }, done);
    });

    it('Can identify big endian tif file.', (done) => {
      testFile('./test/fixtures/fixture-big-endian.tif', {
        name: 'TIFF Image',
        extension: 'tif',
        mime: 'image/tiff',
        subtype: 'big endian'
      }, done);
    });

    it('Can identify wav file.', (done) => {
      testFile('./test/fixtures/fixture.wav', {
        name: 'WAV Audio',
        extension: 'wav',
        mime: 'audio/wav'
      }, done);
    });

    it('Can identify webm file.', (done) => {
      testFile('./test/fixtures/fixture.webm', {
        name: 'WebM Video',
        extension: 'webm',
        mime: 'video/webm'
      }, done);
    });

    it('Can identify webp file.', (done) => {
      testFile('./test/fixtures/fixture.webp', {
        name: 'WebP Image',
        extension: 'webp',
        mime: 'image/webp'
      }, done);
    });

    it('Can identify xz file.', function(done) {
      testFile('./test/fixtures/fixture.xz', {
        name: 'XZ Archive',
        extension: 'xz',
        mime: 'application/x-xz'
      }, done);
    });

    it('Can identify zip file.', (done) => {
      testFile('./test/fixtures/fixture.zip', {
        name: 'ZIP Archive',
        extension: 'zip',
        mime: 'application/zip',
        subtype: 'standard'
      }, done);
    });

    it('Can identify empty zip file.', (done) => {
      testFile('./test/fixtures/fixture-empty.zip', {
        name: 'ZIP Archive',
        extension: 'zip',
        mime: 'application/zip',
        subtype: 'empty'
      }, done);
    });

    it('Can identify spanning zip file.', (done) => {
      testFile('./test/fixtures/fixture.z01', {
        name: 'ZIP Archive',
        extension: 'zip',
        mime: 'application/zip',
        subtype: 'spanning'
      }, done);
    });

    it('Returns null when no signatures match', (done) => {
      testFile('./test/fixtures/fixture.pseudo', null, done);
    });
  });

  describe('Custom file type support', () => {
    it('Should identify a custom format', (done) => {
      var expected = {
        name: 'pseudo format',
        extension: 'pseudo',
        mime: 'application/x-custom'
      };

      var options = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            signature: [{
              value: '6f54b1f31487',
              offset: 0
            }]
          }
        ]
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });

    it('Should identify a custom format from a list.', (done) => {
      var expected = {
        name: 'pseudo format2',
        extension: 'pseudo2',
        mime: 'application/x-custom2'
      };

      var options = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            signature: [{
              value: '6f54b1f42598',
              offset: 0
            }]
          },
          {
            name: 'pseudo format2',
            extension: 'pseudo2',
            mime: 'application/x-custom2',
            signature: [{
              value: '6f54b1f31487',
              offset: 0
            }]
          }
        ]
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });

    it('Should identify a standard format when provided with custom formats.', (done) => {
      var expected = {
        name: '7-zip Archive',
        extension: '7z',
        mime: 'application/x-7z-compressed'
      };

      var options  = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            signature: [{
              value: '7fa92c',
              offset: 65552
            }]
          }
        ]
      };

      testFile('./test/fixtures/fixture.7z', expected, options, done);
    });

    it('Should identify a custom format with a signature outside the usual area.', (done) => {
      var expected = {
        name: 'pseudo format',
        extension: 'pseudo',
        mime: 'application/x-custom'
      };

      var options = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            signature: [{
              value: '7fa92c',
              offset: 65552
            }]
          }
        ]
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });

    it('Should identify a custom format with subtypes', (done) => {
      var expected = {
        name: 'pseudo format',
        extension: 'pseudo',
        mime: 'application/x-custom',
        subtype: 'subtype b'
      };

      var options = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            subtypes: [
              {
                name: 'subtype a',
                signature: {
                  value: '7fa93c',
                  offset: 65552
                }
              },
              {
                name: 'subtype b',
                value: '7fa92c',
                signature: {
                  value: '7fa92c',
                  offset: 65552
                }
              }
            ]
          }
        ]
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });

    it('Should allow custom signatures outside of an array', (done) => {
      var expected = {
        name: 'pseudo format',
        extension: 'pseudo',
        mime: 'application/x-custom'
      };

      var options = {
        formats: [
          {
            name: 'pseudo format',
            extension: 'pseudo',
            mime: 'application/x-custom',
            signature: {
              value: '7fa92c',
              offset: 65552
            }
          }
        ]
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });

    it('Should allow custom formats outside of an array', (done) => {
      var expected = {
        name: 'pseudo format',
        extension: 'pseudo',
        mime: 'application/x-custom'
      };

      var options = {
        formats: {
          name: 'pseudo format',
          extension: 'pseudo',
          mime: 'application/x-custom',
          signature: [{
            value: '7fa92c',
            offset: 65552
          }]
        }
      };

      testFile('./test/fixtures/fixture.pseudo', expected, options, done);
    });
  });
});
