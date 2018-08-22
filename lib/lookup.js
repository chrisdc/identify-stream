'use strict';

const standardFormats = require('../data/formats');

/**
 *
 * @param {(SignaturePart[]|SignaturePart)} signature - File signature for this subtype
 * @param {sting} sample - The sample to check against the signature.
 * @return {boolean} Indicates a match between the signature and sample.
 */
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

/**
 * Check a sample against the standard and (optional) custom formats/
 * @param {string} sample - A sample to check against the defined formats.
 * @param {(Format|Format[])} [customFormats] - One or more custom format to check for.
 * @return {string} The mime type of the streamed file
 */
function lookup(sample, customFormats) {
  if (!Array.isArray(customFormats)) {
    customFormats = [customFormats];
  }

  const formats = standardFormats.concat(customFormats);

  for (var i = 0; i < formats.length; i++) {
    if (formats[i].subtypes) {
      for (var j = 0; j < formats[i].subtypes.length; j++) {
        if (_checkSignature(formats[i].subtypes[j].signature, sample)) {
          return {
            name: formats[i].name,
            extension: formats[i].extension,
            mime: formats[i].mime,
            subtype: formats[i].subtypes[j].name
          };
        }
      }
    } else {
      if (_checkSignature(formats[i].signature, sample)) {
        return {
          name: formats[i].name,
          extension: formats[i].extension,
          mime: formats[i].mime
        };
      }
    }
  }

  return 'unknown';
}

module.exports = lookup;
