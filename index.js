'use strict';

const { Transform } = require('stream');
const formats = require('./data/formats');
const findMax = require('./lib/find-max');

class IndentifyStream extends Transform {
  constructor(options = {}) {
    super({
      highWaterMark: options.highWaterMark || 16384
    });

    //var customFormats = [];

    // Merge custom formats into the list
    this.max = 262;

    if (options.formats) {
      this.max = findMax(options.formats);
    }

    this.formats = formats.concat(options.formats || []);

    this.sample = '';
    //this.position = 0;
    this.complete = false;
  }

  _transform(chunk, encoding, cb) {
    if (this.complete === true) {
      return cb(null, chunk);
    }

    var data = chunk.toString('hex');

    this.sample = this.sample + data;

    if (this.sample.length >= this.max) {
      this.emit('identified', this._findMatch());
    }

    return cb(null, chunk);
  }

  _flush(cb) {
    if (this.sample.length === 0) {
      return cb(new Error('Streamed file is empty'));
    }

    if (this.complete === false) {
      this.emit('identified', this._findMatch());
    }
    cb();
  }

  _findMatch() {
    this.complete = true;

    for (var i = 0; i < this.formats.length; i++) {
      if (this.formats[i].subtypes) {
        for (var j = 0; j < this.formats[i].subtypes.length; j++) {
          if (this._checkSignature(this.formats[i].subtypes[j])) {
            return this.formats[i].mime;
          }
        }
      } else {
        if (this._checkSignature(this.formats[i])) {
          return this.formats[i].mime;
        }
      }
    }

    return 'unknown';
  }

  _checkSignature(format) {
    var sig = format.signature;

    if (!Array.isArray(sig)) {
      sig = [sig];
    }

    for (var i = 0; i < sig.length; i++) {
      let sample = this.sample.slice(
        sig[i].offset, sig[i].offset + sig[i].value.length
      );


      if (sample !== sig[i].value) {
        return false;
      }
    }

    return true;
  }
}

module.exports = IndentifyStream;
