import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import './assets/base.css'
import App from './App.vue'
import router from './router'
// import "@/utils/lodash/index.js"
const app = createApp(App)
app.use(ElementPlus);
app.use(createPinia())
app.use(router)

app.mount('#app')
