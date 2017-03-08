/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { jsdom } from 'jsdom';
import _$ from 'jquery';
import chai, { expect as chaiExpect } from 'chai';
import chaiJquery from 'chai-jquery';

import serverSideState from 'state';

const stylusRequire = require('node-stylus-css-modules-require');
const prependStyleLoader = require('prepend-style-loader');

stylusRequire('[name]__[local]___[hash:base64:5]')(
  function preTransformer(fileContent) {
    fileContent = prependStyleLoader.apply({
      query: '?prepend[]=/src/resources/global/variables&prepend[]=/src/resources/global/mixins',
      cacheable: function() {}
    }, [ fileContent ]);

    return fileContent;
  }
)();

// "Ignore" .css files on server side.
require.extensions['.css'] = function(module, filename) {
  module._compile('module.exports = undefined', filename);
};

import configureStore from 'store';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = {
  userAgent: 'terminal'
};
global.fetch = function() {};
const $ = _$(global.window);
const store = global.window.store = configureStore(serverSideState);

/**
* Render component helper method used to render components into the created cli-DOM.
*
* @param  {ReactClass} ComponentClass React component (ES6)
* @param  {Object} props Props to send to the component
* @param  {boolean} returnReactComponent Decides whether or not to return reactComponent
* @return {React$Element|void} jQuery handle or react reference, depending on param 'returnReactComponent'
*/
export function renderComponent(
  ComponentClass: ReactClass<any>,
  props?: Object = {},
  returnReactComponent?: boolean = false
) {
  let ref: React$Component<any, any, any> = ReactTestUtils.renderIntoDocument(
    <div />
  );

  const component: ReactElement = (
    <Provider store={ store }>
      <ComponentClass
        { ...props }
        ref={ r => ref = r } // eslint-disable-line
      />
    </Provider>
  );

  ReactTestUtils.renderIntoDocument(component);

  if (ref) {
    return returnReactComponent ? ref : $(ReactDOM.findDOMNode(ref));
  }
}

/**
 * Unmounts a react component from it's parent node
 * @param  {[React.Component]} component React Component
 */
export function unmountComponent(component: React.Component<any, any, any>) {
  ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
};

/**
 * Fakes resizing of window and emits a 'resize' event
 * @param  {number} value innerWidth to set
 */
export function resizeWindow(value: number) {
  global.window.innerWidth = value;
  const event = new global.window.Event('resize', { bubbles: true });

  global.document.dispatchEvent(event);
};

/**
 * Event simulator using react Test utilsities.
 *
 * @param  {String} eventName Event type to simulate.
 * @param  {Mixed} value      Value to trigger event with.
 * @return {null}             void
 */
$.fn.simulate = function simulate(eventName: string, value: any): null {
  if (value) {
    this.val(value);
  }

  ReactTestUtils.Simulate[eventName](this[0]); // Trigger a simulate event with passed node.

  return null;
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export const expect = chaiExpect;
