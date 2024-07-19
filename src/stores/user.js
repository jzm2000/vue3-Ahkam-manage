import { defineStore } from "pinia";

export default defineStore("userStore", {
  // state
  state: () => ({
    userInfo: {
      id:5,
      name:"张三",
      chatModel:"4.0Ultra"
    },
  }),
  // actions
  actions: {},
  // getters
  getters: {},
})