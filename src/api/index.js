import { get,post } from "./config.js";

// 话题列表
export const getTitleList = (params) => get("ws/getTitleList",params);
// 对话内容列表
export const getRecordList = (params) => get("ws/getRecordList",params);
// 新建对话
export const createTopic = (params) => post("ws/createTopic",params);