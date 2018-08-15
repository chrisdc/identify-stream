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
    expect(
      lookup(signatures['application/x-7z-compressed'])
    ).to.equal('application/x-7z-compressed');
  });

  it('Should match a multi-part signature', () => {
    expect(
      lookup(signatures['video/avi'])
    ).to.equal('video/avi');
  });

  it('Should match a subtype signature', () => {
    expect(
      lookup(signatures['image/gif-87a'])
    ).to.equal('image/gif');
  });

  it('Should match a custom signature', () => {
    expect(
      lookup(signatures['application/x-custom'], {
        extension: 'pseudo',
        mime: 'application/x-custom',
        signature: {
          value: '1bdd0aaa',
          offset: 64
        }
      })
    ).to.equal('application/x-custom');
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
