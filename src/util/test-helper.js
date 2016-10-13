import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';
import _$ from 'jquery';
import chai, { expect as chaiExptect } from 'chai';
import chaiJquery from 'chai-jquery';

import 'server/style-import-hook';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = {
  userAgent: 'terminal'
};

const $ = _$(global.window);

 /**
 * Render component helper method used to render components into the created cli-DOM.
 *
 * @param  {Component} ComponentClass React comonent
 * @return {DOMElement} Wrapped jquery element node.
 */
export function renderComponent(ComponentClass) {
  const domRef = TestUtils.renderIntoDocument(<ComponentClass />);

  return $(ReactDOM.findDOMNode(domRef));
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export const expect = chaiExptect;
