import { defineStore } from "pinia";
import { ref, computed } from "vue";
export default defineStore("appStore", {
  state: () => {
    return {
      AppData: {
        size: "default",
        labelPosition: "left",
        labelWidth: "auto",
        modelName: "form",
        AppList: [
          {
            type: "ElInput",
            name: "输入框",
            icon: "",
            componentContent: {
              variateName: "",
              defaultValue: "",
              width: "",
              size: "small",
              label: "输入框",
              labelWidth: "auto",
              placeholder: "请输入",
              prop: "",
            },
          },
        ],
      },
    };
  },
  actions: {},
});
