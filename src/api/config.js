import axios from "axios"
import Cookies from "js-cookie"
import { getEncrypt } from "@/utils/ras.js"
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 10000,
});
// axios.defaults.withCredentials = true;
// instance.defaults.withCredentials = true;
export function get(url,params){
  return new Promise((resolve,reject)=>{
    instance.get(url,{
      params,
    }, { credentials: 'include', }).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err);
    })
  })
}
export function post(url, params) {
  return new Promise((resolve, reject) => {
    const config = {
      header:{
        "Content-Type":"application/json"
      }
    }
    instance.post(url,params,config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}
export function del(url, params) {
  return new Promise((resolve, reject) => {
    const config = {
      header: {
        "Content-Type": "application/json"
      } 
    }
    instance.delete(url, {
      params
    }, config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    }) 
  })
}

export function postForm(url, params) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    instance.post(url, params, config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err);
    })
  })
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("请求数据", config.params,config.data);
  if(['get','delete'].includes(config.method)){
    let data = getEncrypt(config.params);
    config.params=data
  }else{
    let data = getEncrypt(config.data);
    config.data = data
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  console.log("响应数据",response)
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});