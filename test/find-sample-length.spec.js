/* eslint-env node, mocha */
'use strict';

const { expect } = require('chai');
const findSampleLength = require('../lib/find-sample-length');
const { STANDARD_SAMPLE_LENGTH } = require('../data/constants');

describe('findSampleLength', () => {
  it('Should return the standard sample length by default', () => {
    var max = findSampleLength();
    expect(max).to.equal(STANDARD_SAMPLE_LENGTH);
  });

  it('Should return the standard sample length if it is the longest value', () => {
    var max = findSampleLength({
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: {
        value: '7fa92c',
        offset: 0
      }
    });
    expect(max).to.equal(STANDARD_SAMPLE_LENGTH);
  });

  it('Should return the length of a simple signature', () => {
    var max = findSampleLength({
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: {
        value: '7fa92c',
        offset: 65552
      }
    });

    expect(max).to.equal(131110);
  });

  it('Should return the length of a multi-part signature', () => {
    var max = findSampleLength({
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: [
        {
          value: 'aabbcc',
          offset: 250
        },
        {
          value: 'ddeeff',
          offset: 260
        }
      ]
    });

    expect(max).to.equal(526);
  });

  it('Should return the greatest length amoungst several subtypes', () => {
    var max = findSampleLength({
      extension: 'pseudo',
      mime: 'application/x-custom',
      subtypes: [
        {
          name: 'Type A',
          signature: {
            value: '474946383761',
            offset: 250
          }
        },
        {
          name: 'Type B',
          signature: {
            value: '474946383961',
            offset: 100
          }
        }
      ]
    });

    expect(max).to.equal(512);
  });

  it('Should return the greatest length of multi-part subtypes', () => {
    var max = findSampleLength({
      extension: 'pseudo',
      mime: 'application/x-custom',
      subtypes: [
        {
          name: 'Type A',
          signature: {
            value: '474946383761',
            offset: 0
          }
        },
        {
          name: 'Type B',
          signature: [
            {
              value: '474946383961',
              offset: 0
            },
            {
              value: '474946383961',
              offset: 300
            }
          ]
        }
      ]
    });

    expect(max).to.equal(612);
  });

  it('Should return the greatest length of an array of formats', () => {
    var max = findSampleLength([
      {
        extension: 'pseudo',
        mime: 'application/x-custom',
        signature: {
          value: '7fa92c',
          offset: 0
        }
      },
      {
        extension: 'pseudo',
        mime: 'application/x-custom',
        signature: [
          {
            value: 'aabbcc',
            offset: 250
          },
          {
            value: 'ddeeff',
            offset: 260
          }
        ]
      },
      {
        extension: 'pseudo',
        mime: 'application/x-custom',
        subtypes: [
          {
            name: 'Type A',
            signature: {
              value: '474946383761',
              offset: 250
            }
          },
          {
            name: 'Type B',
            signature: {
              value: '474946383961',
              offset: 100
            }
          }
        ]
      },
      {
        extension: 'pseudo',
        mime: 'application/x-custom',
        subtypes: [
          {
            name: 'Type A',
            signature: {
              value: '474946383761',
              offset: 0
            }
          },
          {
            name: 'Type B',
            signature: [
              {
                value: '474946383961',
                offset: 0
              },
              {
                value: '474946383961',
                offset: 300
              }
            ]
          }
        ]
      }
    ]);
    expect(max).to.equal(612);
  });
});
