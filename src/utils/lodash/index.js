const fileList = import.meta.glob("./*.js", { eager: true });
let exportFunc = {};
Object.keys(fileList).forEach(key=>{
    let Module = fileList[key];
    exportFunc[Object.keys(Module)] = Module[Object.keys(Module)];
})
export default exportFunc