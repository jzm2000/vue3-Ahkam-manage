/**
 * @description 创建一个新的数组，将array与任何数组或者值连接在一起
 */
export function _concat(array,...args){
    if (Object.prototype.toString.call(array) !== '[object Array]') throw new Error('Input must be an array')
    return array.concat(...args);
}