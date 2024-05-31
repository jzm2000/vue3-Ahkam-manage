/**
 * 
 * @deprecated 数组累加器
 */
export function _reduce(array,callback,defaultVal){
    let delVal = defaultVal || array[0];
    if (arguments.length===3){
        if(Object.prototype.toString.call(defaultVal[2])==='[object Object]'){
            
        }
    }

    let sum = "";
    for (let i = 0; i < array.length; i++) {
        let result = callback.call(this,delVal,array[i],i,array);
        // console.log(result);
        // sum += result;
    }
}