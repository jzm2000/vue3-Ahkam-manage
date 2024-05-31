/**
 * @description 查找元素
 */
export function _find(array,callback,_this){
    let arr = [];
    for(let i=0;i<array.length;i++){
        const result = callback.call(_this,array[i],i,array)
        if(result){
            return array[i]
        }
    }
    return undefined;
}