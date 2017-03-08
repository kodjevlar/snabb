/* @flow */

/**
 * Returns a compiled class Name string of passed arguments
 * @param  {Array<?string|Object>} args Class name to combine and/or evaluate.
 * @return {String}   Comprised classname string.
 */
export default function classNames(...args: Array<?string|{ [key: string]: boolean }>): string {
  let className: string = '';

  const appendClass = function appendClass(styleName: number) {
    className += ` ${styleName}`;
  };

  for (let i:number = 0; i < arguments.length; i++) {
    let obj: any = args[i];
    let key: string;

    if (typeof obj === 'object') {
      key = Object.keys(obj)[0];

      if(obj[key]) {
        appendClass(key);
      }
    } else if (typeof obj === 'string') {
      appendClass(obj);
    }
  }

  return className.replace(' ', '');
}
