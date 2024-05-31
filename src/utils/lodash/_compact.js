/**
 * @description 创建一个新数组，包含原数组中所有的非假值元素
 */
export function _compact(array){
    if (Object.prototype.toString.call(array) !== '[object Array]') throw new Error('Input must be an array')
    let len = array.length;
    let result = [];
    for(let i=0;i<len;i++){
        if(array[i]){
            result.push(array[i])
        }
    }
    return result
}