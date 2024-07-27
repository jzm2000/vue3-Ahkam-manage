import { defineStore } from "pinia";
import { login } from "@/api/index.js"
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
  actions: {
    loginAction(param){
      return new Promise((resolve,reject)=>{
        login(param).then(res=>{
          if(res.code===200){
            this.userInfo = res.userInfo
            resolve(res)
          }else{
            resolve(res)
          }
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
  // getters
  getters: {},
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }, // userInfo localstorage存储
    ],
  },
})