const { Transform } = require('stream');
const signatures = require('./data/signatures');

class IndentifyStream extends Transform {
  constructor(options = {}) {
    super({
      highWaterMark: options.highWaterMark || 16384
    });

    // Merge custom formats into the list
    this.max = 262;
    if (options.signatures) {
      this.signatures = Object.assign(signatures, options.signatures);

      // Do we need to increase the sample size?
      for (var type in signatures) {
        for (var i = 0; i < signatures[type].length; i++) {
          let entry = signatures[type][i];
          this.max = Math.max(entry.offset + entry.buffer.length, this.max);
        }
      }
    } else {
      this.signatures = signatures;
    }

    this.sample = '';
    this.position = 0;
    this.max = 262;
    this.complete = false;
  }

  _transform(chunk, encoding, cb) {
    if (this.complete === true) {
      return cb(null, chunk);
    }

    var data = chunk.toString('hex');

    this.sample = this.sample + data;

    if (this.sample.length >= this.max) {
      // Look for matches
      this.complete = true;

      for (var type in signatures) {
        for (var i = 0; i < signatures[type].length; i++) {
          let entry = signatures[type][i];
          let sample = this.sample.slice(entry.offset, entry.offset + entry.buffer.length);

          if (sample === entry.buffer) {
            // We have a match
            this.emit('identified', type);
            return cb(null, chunk);
          }
        }
      }

      // No matches found
      this.emit('identified', 'unknown');
    }

    return cb(null, chunk);
  }
}

module.exports = IndentifyStream;
