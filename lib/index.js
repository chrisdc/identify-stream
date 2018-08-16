'use strict';

const { Transform } = require('stream');
const findSampleLength = require('./find-sample-length');
const lookup = require('./lookup');

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Format
 * @property {string} extension - File extension
 * @property {string} mime -
 * @property {Object[]} [subtypes]
 * @property {(SignaturePart[]|SignaturePart)} [signature] - File signature for this format
 */

/**
 * A subtype
 * @typedef {Object} SubType
 * @property {string} type - Subtype name
 * @property {(SignaturePart[]|SignaturePart)} signature - File signature for this subtype
 */

/**
 * A signature
 * @typedef {Object} SignaturePart
 * @property {string} value - gg
 * @property {number} offset - gg
 */

/**
 * Transform stream for identifying files based on their magic numbers.
 * @extends Transform
 */
class IndentifyStream extends Transform {
  /**
   * Create an instance of IndentifyStream
   * @param {Object} options - Stream instance options.
   * @param {number} [options.highWaterMark] - Number of bytes that may be buffered by the stream.
   * @param {(Format|Format[])} [customFormats] - One or more custom format to check for.
   */
  constructor(options = {}) {
    super({
      highWaterMark: options.highWaterMark || 16384
    });

    // How much of a smaple do we need to test every file type?
    this.sampleLength = findSampleLength(options.formats);
    this.customFormats = options.formats || [];
    this.sample = '';
    this.complete = false;
  }

  /**
   * Build and test the sample against known formats.
   * @param {Buffer} chunk - The current chunk.
   * @param {string} encoding - The encoding of the current chunk.
   * @param {function} cb - Callback function used to emit data or errors.
   * @return {function} - The callback function
   * @private
   */
  _transform(chunk, encoding, cb) {
    if (this.complete === false) {
      // Append the current chunk (in hex) to the sample.
      this.sample = this.sample + chunk.toString('hex');

      // Once we have a big enough sample attempt to identify the file type.
      if (this.sample.length >= this.sampleLength) {
        this.emit('identified', lookup(this.sample, this.customFormats));
        this.complete = true;
      }
    }

    return cb(null, chunk);
  }

  /**
   * Check if any data has been received and check for results if still needed.
   * @param {function} cb - Callback function to be called when complete.
   * @return {function} - The callback function
   * @private
   */
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

    return cb();
  }
}

module.exports = IndentifyStream;
