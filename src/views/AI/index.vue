<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="300px">
        <slideBar @handleSelect="handleSelect"/>
      </el-aside>
      <el-container class="main_container">
        <div ref="chatRef" class="el-main">
          <div class="ai_chat_main" v-loading="chatLoading">
            <ul class="chat_list">
              <li
                class="chat_list_item"
                v-for="(item, index) in chatList"
                :key="index"
              >
                <div
                  class="chat_item_content"
                  :class="{ user_style: item.role == 'user' }"
                >
                  <div class="chat_img">
                    <i
                      class="iconfont"
                      style="font-size: 35px"
                      :class="{
                        'icon-Ai': item.role == 'assistant',
                        'icon-yonghu': item.role == 'user',
                      }"
                    ></i>
                  </div>
                  <div
                    class="chat_info"
                    :class="{
                      mr12: item.role == 'user',
                      ml12: item.role == 'assistant',
                    }"
                    v-loading="!item.content&&index == uniqueIndex"
                  >
                     <v-md-preview :text="item.content" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
                  </div>
                </div>
              </li>
            </ul>
            <div v-show="isShowBtn" class="go_to_bottom" @click="goToBottom()">
              <i class="iconfont icon-xia" style="font-size:20px;"></i>
            </div>
          </div>
        </div>
        <el-footer>
          <el-input
            type="textarea"
            v-model="keyWord"
            placeholder="请输入聊天内容（shift + enter）换行"
            :rows="4"
            class="text_area"
            resize="none"
            @keypress="(event)=> {if(event.keyCode==13 && !event.shiftKey) event.preventDefault();}"
            @keyup.enter="(event)=>sendMsg(event)"
          ></el-input>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import slideBar from "./components/slideBar.vue"
import { getRecordList } from "@/api/index.js";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  defineComponent,
  nextTick,
  computed,
  watch
} from "vue";
import {ElMessage} from "element-plus"
let keyWord = ref("");
let chatRef = ref("");
let mainRef;
let isLoading = ref(false);
let chatLoading = ref(false);
let chatList = reactive([]);
let scrollTop = ref(0)
let isShowBtn = ref(false);
let uniqueIndex = ref(-1)
let isReplay = ref(false);
const chatInfo = reactive({
  id:null,
  userId:4,
  type:1
})
const queryParams = reactive({
  pageSize:10,
  pageNum:1
})
onMounted(() => {
  mainRef = document.querySelector(".el-main");
  mainRef.addEventListener("scroll", (e) => {
    scrollTop.value = e.target.scrollTop;
    if(!scrollTop.value){
      scrollLoad();
      e.target.scrollTop = 20
    }
  });
  goToBottom();
});
isShowBtn = computed(()=>{
  if(!chatRef.value) return false
  return  chatRef.value.scrollHeight - chatRef.value.clientHeight -  scrollTop.value > 300 
})
nextTick(()=>{

}) 
onBeforeUnmount(()=>{
  mainRef.removeEventListener("scroll", (e) => {
    scrollTop.value = e.target.scrollTop;
  });
})

function sendMsg(e) {
  let keyVal = keyWord.value
  if(e.shiftKey) return;
  if(isReplay.value) return ElMessage.error("请等待回复")
  if(["",null,undefined].includes(keyWord.value.trim())) return ElMessage.error("请输入内容")
  isReplay.value = true;
  chatList.push({
    role: "user",
    content: keyWord.value.replace(/\n/g,'<br>'),
  });
  chatList.push({
    role: "assistant",
    content: "",
  });
  uniqueIndex.value = chatList.length - 1
  nextTick(() => {
    goToBottom();
  });
  isLoading.value = true;
  keyWord.value = ""
  fetch(`${import.meta.env.VITE_APP_URL}/ws/getAccessToken`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: keyVal,
      userId: chatInfo.userId,
      id:chatInfo.id,
      type:chatInfo.type
    }),
  })
    .then((response) => {
      if(response.status == 500){
        isLoading.value = false;
        isReplay.value = false;
        chatList.pop();
        ElMessage.error(response.statusText)
        return false
      }
      
      const decoder = new TextDecoder("utf-8");
      let buffer = [];
      isLoading.value = false;
      const reader = response.body.getReader();
      function read() {
        reader.read().then( function processText({ done, value }) {
          if (done) {
            return buffer;
          }
          const chunk = decoder.decode(value, { stream: false });
          console.log(chunk.substring(chunk.indexOf("{")))
          let obj = JSON.parse(chunk.substring(chunk.indexOf('{')))
          goToBottom();
          chatList.at(-1).content += obj.content;
          if(obj.type==2) isReplay.value = false;
          read();
        });
      }
      return read();
    })
    .then((res) => {
      uniqueIndex.value = ""
    })
    .catch((err) => {
      isReplay.value = false;
      chatList.pop();
    });
}

function isJSON(str){
  if(typeof str === 'string'){
    try{
      let obj=JSON.parse(str);
      if(typeof obj == 'object' && obj ){
        return true;
      }else{
        return false;
      }
    }catch(e){
      return false
    }
  }else{
    return false;
  }
}
function goToBottom() {
  mainRef.scrollTop = mainRef.scrollHeight;
}
function handleCopyCodeSuccess(){
  ElMessage({
    message:"复制成功",
    type:"success"
  })
}
function scrollLoad(){
  chatLoading.value = true;
  queryParams.pageNum++
  let params = {
    ...chatInfo,
    ...queryParams
  }
  getRecordList(params).then(res=>{
    if(res.record.rows.length===0){
      queryParams.pageNum-=1;
    }
    chatLoading.value = false;
    chatList.unshift(...res.record.rows)
  })
}
function handleSelect(obj){
  chatInfo.id = obj.id
  chatInfo.type = obj.type
  queryParams.pageNum = 1;
  chatLoading.value = true;
  let params = {
    ...chatInfo,
    ...queryParams
  }
  getRecordList(params).then(res=>{
    chatLoading.value = false;
    chatList.length = 0;
    chatList.push(...res.record.rows);
    nextTick(()=>{
      if(chatList.length){
        goToBottom();
      }else{
        mainRef.scrollTop = 1
      }
    })
  })
}
</script>

<style scoped lang="scss">
.chat_item_content {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  .chat_info {
    margin-top: 12px;
    p {
      margin: 0;
    }
  }
  :deep(.vuepress-markdown-body):not(.custom){
    padding: 10px !important;
    border-radius: 8px;
    font-size: 14px;
  }
}
.chat_list {
  overflow-y: auto;
}
.user_style {
  flex-direction: row-reverse;
}
.el-footer {
  height: 100px;
  // background-color: #B3C0D1;
}
.main_container {
  background-color: #f1f4f6;
}
.el-main {
  position: relative;
  height: calc(100vh - 100px);
  scroll-behavior: smooth;
  .go_to_bottom{
    position: fixed;
    bottom: 170px;
    right: 20px;
    background-color: #fff;
    border-radius: 50%;
    padding: 0px 7.7px;
    cursor: pointer;
    &:hover {
      background-color: #d7d7d7;
    }
  }
}

.text_area {
  border-radius: 12px;
}
.ml12 {
  margin-left: 12px;
}
.mr12 {
  margin-right: 12px;
}
</style>
