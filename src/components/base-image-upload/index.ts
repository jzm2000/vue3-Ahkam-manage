import type {App} from "vue"
import baseImageUpload from "./index.vue";

export default {
  install(app:App){
    app.component("baseImageUpload", baseImageUpload);
  }
}