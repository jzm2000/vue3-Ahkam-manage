import { get, post, del } from "./config.js";

// 话题列表
export const getTitleList = (params) => get("ws/getTitleList",params);
// 对话内容列表
export const getRecordList = (params) => get("ws/getRecordList",params);
// 新建对话
export const createTopic = (params) => post("ws/createTopic",params);
// 删除对话
export const deleteTopic = (params) => del("ws/deleteTopic",params);