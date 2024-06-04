import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import JComponent from "@/components/index.ts"
import piniaPluginPersist from "pinia-plugin-persist";
import 'element-plus/dist/index.css';
import './assets/base.css'
import App from './App.vue'
import router from './router'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import "@/utils/lodash/index.js"
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(ElementPlus);
app.use(JComponent);
app.use(pinia);
app.use(router)

app.mount('#app')
