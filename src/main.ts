import { createApp } from 'vue'
import { createPinia } from 'pinia'
//markDownEditor
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// highlightjs
import Prism from "prismjs";
VMdEditor.use(vuepressTheme, {
  Prism: Prism,
});
VMdPreview.use(vuepressTheme, {
  Prism,
});
VMdEditor.use(createCopyCodePlugin());
VMdPreview.use(createCopyCodePlugin());
//markDownEditor

import ElementPlus from "element-plus";
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css"; // 引入样式
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
app.use(VMdPreview);
app.use(VMdEditor);
app.use(ElementPlus);
app.use(JComponent);
app.use(JsonViewer);
app.use(pinia);
app.use(router)

app.mount('#app')
