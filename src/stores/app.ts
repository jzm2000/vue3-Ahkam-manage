import { defineStore } from "pinia";
import { ref, computed } from "vue";
export default defineStore("appStore", {
  state: () => {
    return {
      AppData: {
        size: "default",
        labelPosition: "left",
        labelWidth: 0,
        formName: "formSetting",
        RefFormName: "formRef",
        AppList: [],
      },
      currentComponent: {},
    };
  },
  getters: {},
  actions: {
    setCurrentComponent(uid) {
      this.currentComponent = this.AppData.AppList.find((e) => e.uid == uid);
    },
    delCurrentComponent() {},
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }, // userInfo localstorage存储
    ],
  },
});
