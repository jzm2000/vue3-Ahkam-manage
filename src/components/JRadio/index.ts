import type { App } from "vue";
import JRadio from "./index.vue";
export default {
  install(app: App) {
      app.component("JRadio", JRadio);
  },
};