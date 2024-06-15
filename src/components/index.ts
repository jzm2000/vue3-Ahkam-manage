import type {App} from "vue"
const componentTabs = import.meta.glob("./**/index.ts",{eager:true});
export default {
  install(app:App) {
    for(let key in componentTabs){
       app.use(componentTabs[key].default);
    }
  },
};
