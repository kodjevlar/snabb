// @flow
// TODO: replace with a more performat method or start using immutable.js
function clone(obj: Object|Array<any>): any {
  return JSON.parse(JSON.stringify(obj));
}

export default clone;
