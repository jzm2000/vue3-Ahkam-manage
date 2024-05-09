/**
 * @description 将数组拆分成多个size长度的区块，并形成一个新数组
 * @param { Array } array 数组
 * @param { Number } size 数组的长度
 */
export function _chunk(array, size = 1) {
    if (!Array.isArray(array)) {
        throw new Error("Input must be an array");
    }
    if (size < 1) {
        throw new Error("chunk size mush be positive number");
    }
    const chunks = [];
    let index = 0;
    while (index < array.length) {
        const endIndex = index + size;
        chunks.push(array.slice(index, endIndex > array.length ? array.length : endIndex))
        index += size;
    }
    return chunks;
}