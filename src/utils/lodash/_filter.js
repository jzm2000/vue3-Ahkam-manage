/**
 * @description 数组过滤
 */
export function _filter(array,callback,_this){
    if (Object.prototype.toString.call(array) === '[object Array]'){
        let arr = [];
        for (let index = 0; index < array.length; index++) {
            const result = callback.call(_this, array[index],array);
            if(result){
                arr.push(array[index]);
            }
        }
        return arr;
    } else {
        return new Error("Input must be an array");
    }
}