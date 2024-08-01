import axios from "axios"
import Cookies from "js-cookie"
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 10000,

});
console.log(import.meta.env.VITE_APP_URL)
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Cookie'] = Cookies.get('connect.sid');
console.log(Cookies.get('connect.sid'))
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
  
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  console.log(response)
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});