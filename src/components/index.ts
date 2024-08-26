import type {App} from "vue"
// const componentTabs = import.meta.glob("./**/index.ts",{eager:true});
const componentTabs = import.meta.webpackContext('../', {
  // 是否搜索子目录
  recursive: false,
  regExp: /\.ts$/,
});
export default {
  install(app:App) {
    for(let key in componentTabs){
       app.use(componentTabs[key].default);
    }
  },
};
