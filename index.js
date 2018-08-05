const { Transform } = require('stream');
const formats = require('./data/formats');

class IndentifyStream extends Transform {
  constructor(options) {
    super(options || {});

    // Merge custom formats into the list

    this.sample = '';
    this.position = 0;
  }

  _transform(chunk, encoding, cb) {
  }
}

module.exports = IndentifyStream;
