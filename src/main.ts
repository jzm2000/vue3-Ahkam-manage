import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import piniaPluginPersist from "pinia-plugin-persist";
import 'element-plus/dist/index.css';
import './assets/base.css'
import App from './App.vue'
import router from './router'
// import "@/utils/lodash/index.js"
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(ElementPlus);
app.use(pinia);
app.use(router)

app.mount('#app')
