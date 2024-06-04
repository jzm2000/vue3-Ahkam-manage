import type { App } from "vue";
import JCheckBox from "./index.vue";
export default {
    install(app:App){
        app.component("JCheckBox", JCheckBox);
    }
}