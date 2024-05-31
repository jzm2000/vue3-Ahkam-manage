/**
 * @description 检查数组array和对比的数组相同的值，过滤掉此值
 *
 */
export function _difference(array,values){
    let arr = [];
    for(let i = 0;i<array.length;i++){
        for(let j = 0;j<values.length;j++){
            if(array[i]===values[j]){
                arr.push(array[i]);
            }
        }
    }
    let index = arr.length;
    while(index--){
        array.splice(array.indexOf(arr[index]),1);
    }
    return array;
}