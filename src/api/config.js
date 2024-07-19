import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 10000,
});

export function get(url,params){
  return new Promise((resolve,reject)=>{
    instance.get(url,{
      params,
    }).then(res=>{
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