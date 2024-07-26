import { get, post, del } from "./config.js";

// 话题列表
export const getTitleList = (params) => get("ws/getTitleList",params);
// 对话内容列表
export const getRecordList = (params) => get("ws/getRecordList",params);
// 新建对话
export const createTopic = (params) => post("ws/createTopic",params);
// 修改话题
export const updateTopic = (params) => post("ws/updateTopic",params);
// 删除对话
export const deleteTopic = (params) => del("ws/deleteTopic",params);
// 获取验证码
export const getCaptcha = (params) => get("users/captcha",params);
// 更换版本
export const selectVersion = (params) => post("ws/selectVersion",params);
//登录
export const login = (params) => post("users/login",params);
