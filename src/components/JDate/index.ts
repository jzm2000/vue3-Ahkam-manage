import type {App} from "vue";
import JDate from "./index.vue"
export default{
  install(app:App){
    app.component('JDate',JDate)
  }
}