import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
import { isJson } from "@/utils/base.js"
export function getEncrypt(param){
  if(param){
    if(Object.prototype.toString.call(param) == '[object Object]'){
      
    }
    if (Object.prototype.toString.call(param) == '[object Array]') {
      
    }
    if (Object.prototype.toString.call(param) == '[object String]') {
      param = isJson(param) ? JSON.parse(params) : {}
    }
    let random = getRandom(16);
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(import.meta.env.VITE_APP_PLUBLIC_KEY);
    let sk = encrypt.encrypt(random);
    let str = ""
    for(let key in param){
      str += param[key];
    };
    let sign = CryptoJS.MD5(str).toString().toUpperCase();
    let objData = EncryptASE(random, {
      ...param,
      sign
    })
    let data = {
      sk:sk,
      data: objData
    };
    
    return data
  }
  return param
}
function getRandom(num=0){
  let arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let str = "";
  for(let i=0;i<num;i++){
    str += arr[Math.floor(Math.random()*arr.length)];
  }
  return str
}
function EncryptASE(random,obj){
  let key = CryptoJS.enc.Utf8.parse(random);
  let val = CryptoJS.enc.Utf8.parse(JSON.stringify(obj));
  //加密
  let encrypt = CryptoJS.AES.encrypt(val, key, {
    iv: CryptoJS.enc.Utf8.parse('0010010000100100'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypt.ciphertext.toString()
}