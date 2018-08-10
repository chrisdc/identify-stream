'use strict';
const { Transform } = require('stream');
const formats = require('./data/formats');

class IndentifyStream extends Transform {
  constructor(options = {}) {
    super({
      highWaterMark: options.highWaterMark || 16384
    });

    // Merge custom formats into the list
    this.max = 262;
    if (options.formats) {
      for (var i = 0; i < options.formats.length; i++) {
        for (var j = 0; j < options.formats[i].signatures.length; j++) {
          let entry = formats[i].signatures[j];
          this.max = Math.max(entry.offset + entry.buffer.length, this.max);
        }
      }
    }

    this.formats = Object.assign(formats, options.formats || {});

    this.sample = '';
    this.position = 0;
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
    if (this.complete === false) {
      this.emit('identified', this._findMatch());
    }
    cb();
  }

  _findMatch() {
    this.complete = true;

    for (var i = 0; i < formats.length; i++) {
      if (formats[i].subtypes) {
        for (var j = 0; j < formats[i].subtypes.length; j++) {
          if (this._checkSignature(formats[i].subtypes[j])) {
            return formats[i].mime;
          }
        }
      } else {
        if (this._checkSignature(formats[i])) {
          return formats[i].mime;
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
