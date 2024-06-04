import type {App} from "vue"
import JRadio from "./JRadio/index.ts";
import JInput from "./JInput/index.ts";
import JSelect from "./JSelect/index.ts";
import JCheckBox from "./JCheckBox/index.ts";
const componentTabs = [JRadio, JInput, JSelect, JCheckBox];
export default {
  install(app:App) {
    componentTabs.forEach((item: any) => {
      app.use(item);
    });
  },
};
