'use strict';

const { STANDARD_SAMPLE_LENGTH } = require('../data/constants');

function _localMax(signature) {
  if (!Array.isArray(signature)) {
    signature = [signature];
  }

  return signature.reduce((currentLength, part) => {
    return Math.max(currentLength, part.offset + part.value.length);
  }, 0);
}

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
