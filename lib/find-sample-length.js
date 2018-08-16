'use strict';

const { STANDARD_SAMPLE_LENGTH } = require('../data/constants');

/**
 * Find the sample size required to test a given signature.
 * @param {(SignaturePart[]|SignaturePart)} signature - Signature to test against.
 * @return {number} The required sample length for this signature.
 */
function _localMax(signature) {
  if (!Array.isArray(signature)) {
    signature = [signature];
  }

  return signature.reduce((currentLength, part) => {
    return Math.max(currentLength, part.offset + part.value.length);
  }, 0);
}

/**
 * Find the sample size required to test a range of file formats.
 * @param {(Format|Format[])} formats - One or more formats to test against.
 * @return {number} The required sample length.
 */
function findSampleLength(formats) {
  if (!formats) {
    return STANDARD_SAMPLE_LENGTH;
  }

  if (!Array.isArray(formats)) {
    formats = [formats];
  }

  return formats.reduce((currentLength, format) => {
    if (format.subtypes) {
      return format.subtypes.reduce((length, subtype) => {
        return Math.max(length, _localMax(subtype.signature));
      }, currentLength);
    } else {
      return Math.max(currentLength, _localMax(format.signature));
    }
  }, STANDARD_SAMPLE_LENGTH);
}

module.exports = findSampleLength;

