'use strict';

const standardFormats = require('../data/formats');

function _checkSignature(signature, sample) {
  if (!Array.isArray(signature)) {
    signature = [signature];
  }

  for (var i = 0; i < signature.length; i++) {
    let subSample = sample.slice(
      signature[i].offset, signature[i].offset + signature[i].value.length
    );

    if (subSample !== signature[i].value) {
      return false;
    }
  }

  return true;
}

function lookup(sample, customFormats) {
  if (!Array.isArray(customFormats)) {
    customFormats = [customFormats];
  }

  const formats = standardFormats.concat(customFormats);

  for (var i = 0; i < formats.length; i++) {
    if (formats[i].subtypes) {
      for (var j = 0; j < formats[i].subtypes.length; j++) {
        if (_checkSignature(formats[i].subtypes[j].signature, sample)) {
          return formats[i].mime;
        }
      }
    } else {
      if (_checkSignature(formats[i].signature, sample)) {
        return formats[i].mime;
      }
    }
  }

  return 'unknown';
}

module.exports = lookup;
