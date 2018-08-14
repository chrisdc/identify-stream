function localMax(signature) {
  var max = 0;

  if (!Array.isArray(signature)) {
    signature = [signature];
  }

  for (var i = 0; i < signature.length; i++) {
    max = Math.max(max, signature[i].offset + signature[i].value.length);
  }

  return max;
}

function findMax(formats) {
  var max = 0;

  if (!Array.isArray(formats)) {
    formats = [formats];
  }

  for (var i = 0; i < formats.length; i++) {
    if (formats[i].subtypes) {
      for (var j = 0; j < formats[i].subtypes.length; j++) {
        max = Math.max(max, localMax(formats[i].subtypes[j].signature));
      }
    } else {
      max = Math.max(max, localMax(formats[i].signature));
    }
  }

  return max;
}

module.exports = findMax;
