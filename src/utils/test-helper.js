const nodeStylusRequire = require('node-stylus-css-modules-require');
const prependStyleLoader = require('prepend-style-loader');
nodeStylusRequire('[name]__[local]___[hash:base64:5]')(
  function(fileContent) {
    return prependStyleLoader.apply({
      query: 'prepend=[src/resources/global/variables, src/resources/global/mixins]',
      cacheable: function() {}
    }, [fileContent]);
  }
)(/* post-transformer */);

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';
import _$ from 'jquery';
import chai, { expect as chaiExptect } from 'chai';
import chaiJquery from 'chai-jquery';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = {
  userAgent: 'terminal'
};

const $ = _$(global.window);

/**
* Render component helper method used to render components into the created cli-DOM.
*
* @param  {Component} ComponentClass React component (ES6)
* @param  {Object} props Props to send to the component
* @param  {Boolean} returnReactComponent Decides whether or not to return reactComponent
* @return {Mixed} jQuery handle or react reference, depending on param 'react'
*/
export function renderComponent(
  ComponentClass,
  props = {},
  returnReactComponent = false
) {
  const domRef = ReactTestUtils.renderIntoDocument(<ComponentClass { ...props } />);

  return returnReactComponent ? domRef : $(ReactDOM.findDOMNode(domRef));
}

/**
 * Event simulator using react Test Utilities.
 *
 * @param  {String} eventName Event type to simulate.
 * @param  {Mixed} value      Value to trigger event with.
 */
$.fn.simulate = function simulate(eventName, value) {
  if (value) {
    this.val(value);
  }

  ReactTestUtils.Simulate[eventName](this[0]); // Trigger a simulate event with passed node.
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export const expect = chaiExptect;
