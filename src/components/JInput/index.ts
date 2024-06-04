import type { App } from "vue";
import JInput from "./index.vue"

export default {
    install(app:App){
        app.component("JInput",JInput)
    }
}