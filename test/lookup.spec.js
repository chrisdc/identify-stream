/* eslint-env node, mocha */
'use strict';

const { expect } = require('chai');
const lookup = require('../lib/lookup');
const signatures = require('./fixtures/test-signatures');

describe('lookup', () => {
  it('Loads', () => {
    expect(typeof lookup).to.equal('function');
  });

  it('Should match a simple signature', () => {
    var expected = {
      name: '7-zip Archive',
      extension: '7z',
      mime: 'application/x-7z-compressed'
    };

    var result = lookup(signatures['application/x-7z-compressed']);

    expect(result).to.deep.equal(expected);
  });

  it('Should match a multi-part signature', () => {
    var expected = {
      name: 'AVI Video',
      extension: 'avi',
      mime: 'video/avi'
    };

    var result = lookup(signatures['video/avi']);

    expect(result).to.deep.equal(expected);
  });

  it('Should match a subtype signature', () => {
    var expected = {
      name: 'GIF Image',
      extension: 'gif',
      mime: 'image/gif',
      subtype: '87a'
    };

    var result = lookup(signatures['image/gif-87a']);

    expect(result).to.deep.equal(expected);
  });

  it('Should match a custom signature', () => {
    var customFormats = {
      name: 'pseudo format',
      extension: 'pseudo',
      mime: 'application/x-custom',
      signature: {
        value: '1bdd0aaa',
        offset: 64
      }
    };

    var expected = {
      name: 'pseudo format',
      extension: 'pseudo',
      mime: 'application/x-custom'
    };

    var result = lookup(signatures['application/x-custom'], customFormats);

    expect(result).to.deep.equal(expected);
  });

  it('Should return \'unknown\' when no matches are found', () => {
    expect(
      lookup(signatures['application/x-custom'], {
        extension: 'pseudo',
        mime: 'application/x-custom',
        signature: {
          value: '5fddhfgh',
          offset: 64
        }
      })
    ).to.equal('unknown');
  });
});
