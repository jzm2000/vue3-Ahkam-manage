import type { App } from "vue";
import JSelect from "./index.vue";
export default {
    install(app:App){
        app.component("JSelect",JSelect)
    }
}