/**
 * @description 判断一个数组是否包含一个指定的值
 * @return { Boolean }
 */
export function _includes(array,value,fromIndex=0){
    let flag = false;
    let arr = [];
    let str = "";
    if(Array.isArray(array)){
        arr = array;
    } else if (Object.prototype.toString.call(array) === '[object Object]'){
        arr = Object.values(array);
    }else if(typeof array === 'string'){
        str = array.substring(fromIndex);
    }
    if(arr.length){
        let index = fromIndex < 0 ? fromIndex + arr.length : fromIndex;
        if (index < 0) index = 0;
        for (let i = index; i < arr.length; i++) {
            if (arr[i] === value) {
                flag = true;
            }
        }
    }else{
        flag = str.indexOf(value) !== -1
    }
   
    return flag
}