'use strict';

const { Transform } = require('stream');
const findSampleLength = require('./find-sample-length');
const lookup = require('./lookup');

class IndentifyStream extends Transform {
  constructor(options = {}) {
    super({
      highWaterMark: options.highWaterMark || 16384
    });

    this.sampleLength = findSampleLength(options.formats);
    this.customFormats = options.formats || [];
    this.sample = '';
    this.complete = false;
  }

  _transform(chunk, encoding, cb) {
    if (this.complete === true) {
      return cb(null, chunk);
    }

    var data = chunk.toString('hex');

    this.sample = this.sample + data;

    if (this.sample.length >= this.sampleLength) {
      this.emit('identified', lookup(this.sample, this.customFormats));
      this.complete = true;
    }

    return cb(null, chunk);
  }

  _flush(cb) {
    // Emit an error if we've reached the end without processing any data.
    if (this.sample.length === 0) {
      return cb(new Error('Streamed file is empty'));
    }

    // If a file is very small there might not be enough data to test every file
    // format. If this is the case test as many formats as we can now.
    if (this.complete === false) {
      this.emit('identified', lookup(this.sample, this.customFormats));
      this.complete = true;
    }
    cb();
  }
}

module.exports = IndentifyStream;
