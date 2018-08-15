/* eslint-env node, mocha */
'use strict';

const { expect } = require('chai');
const findMax = require('../lib/find-max');
const formats = require('../data/formats');

describe('findMax', () => {
  it('Should handle a simple format', () => {
    var max = findMax({
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: {
        value: '7fa92c',
        offset: 131104
      }
    });

    expect(max).to.equal(131110);
  });

  it('Should handle a format with a multi-part signature', () => {
    var max = findMax({
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: [
        {
          value: 'aabbcc',
          offset: 5
        },
        {
          value: 'ddeeff',
          offset: 15
        }
      ]
    });

    expect(max).to.equal(21);
  });

  it('Should hande a format with subtypes', () => {
    var max = findMax({
      extension: 'gif',
      mime: 'image/gif',
      subtypes: [
        {
          type: '87a',
          signature: {
            value: '474946383761',
            offset: 0
          }
        },
        {
          type: '89a',
          signature: {
            value: '474946383961',
            offset: 0
          }
        }
      ]
    });

    expect(max).to.equal(12);
  });

  it('Should handle a format with multi-part subtypes', () => {
    var max = findMax({
      extension: 'gif',
      mime: 'image/gif',
      subtypes: [
        {
          type: '87a',
          signature: {
            value: '474946383761',
            offset: 0
          }
        },
        {
          type: '89a',
          signature: [
            {
              value: '474946383961',
              offset: 0
            },
            {
              value: '474946383961',
              offset: 12
            }
          ]
        }
      ]
    });

    expect(max).to.equal(24);
  });

  it('Should handle a mixed array of formats', () => {
    var max = findMax(formats);
    expect(max).to.equal(32);
  });
});
