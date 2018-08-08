const { Transform } = require('stream');
const formats = require('./data/signatures3');

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
      this.emit('identified', this.check() || 'unknown');
    }
    /*if (this.sample.length >= this.max) {
      // Look for matches
      this.complete = true;

      for (var i = 0; i < formats.length; i++) {
        for (var j = 0; j < formats[i].signatures.length; j++) {
          let entry = formats[i].signatures[j];
          let sample = this.sample.slice(entry.offset, entry.offset + entry.buffer.length);

          //console.log(formats[i], formats[i].signatures[j].version);

          if (sample === entry.buffer) {
            // We have a match
            this.emit('identified', formats[i].mime);
            return cb(null, chunk);
          }
        }
      }

      // No matches found
      this.emit('identified', 'unknown');
    }*/

    return cb(null, chunk);
  }

  _flush(cb) {
    if (this.complete === false) {
      this.emit('identified', this.check() || 'unknown');
    }
    cb();
  }

  check() {
    this.complete = true;

    for (var i = 0; i < formats.length; i++) {
      for (var j = 0; j < formats[i].signatures.length; j++) {
        let entry = formats[i].signatures[j];
        let sample = this.sample.slice(entry.offset, entry.offset + entry.buffer.length);

        if (sample === entry.buffer) {
          // We have a match
          return formats[i].mime;
          /*this.emit('identified', formats[i].mime);
          return;*/
          //return cb(null, chunk);
        }
      }
    }

    return;
  }
}

module.exports = IndentifyStream;
