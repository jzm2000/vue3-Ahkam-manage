<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container class="main_container">
        <div ref="chatRef" class="el-main">
          <div class="ai_chat_main">
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
                  >
                    <!-- <span></span> -->
                    <!-- <p>{{ item.content }}</p> -->
                     <v-md-preview :text="item.content" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="isShowBtn" class="go_to_bottom" @click="goToBottom()">
              <i class="iconfont icon-xia" style="font-size:24px;"></i>
            </div>
          </div>
        </div>
        <el-footer>
          <el-input
            type="textarea"
            v-model="keyWord"
            placeholder="请输入聊天内容"
            :rows="4"
            class="text_area"
            resize="none"
            @keyup.enter="sendMsg"
          ></el-input>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
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
let chatList = reactive([{"role":"user","content":"你好啊\n"},{"role":"assistant","content":"你好！有什么我可以帮助你的吗？"},{"role":"user","content":"你能为我干什么\n"},{"role":"assistant","content":"作为一个认知智能模型，我可以为您提供以下服务：\n  * 回答各种问题：无论您需要了解关于历史、科学、文化、技术等方面的知识，我都可以尽力为您提供答案。\n  * 提供建议和指导：如果您需要在某个领域寻求建议或指导，例如学习新技能、解决难题、制定计划等，我可以根据您的需求提供一些有用的信息和建议。\n  * 进行翻译：如果您需要将一种语言翻译成另一种语言，我可以帮助您完成这项任务。\n  * 娱乐和休闲：除了上述功能外，我还可以与您进行闲聊、讲笑话、分享有趣的故事等活动，以帮助您放松身心。\n当然，这些只是我能够提供的一小部分服务。如果您有任何其他需求或问题，欢迎随时向我提问！"},{"role":"user","content":"请为我写一首诗\n"},{"role":"assistant","content":"在茫茫人海中漂泊，\n寻觅着一份属于自己的归宿。\n岁月匆匆，时光飞逝，\n我却依旧孑然一身。\n走过了荒芜的沙漠，\n穿越了茂密的森林。\n我看到了大海的辽阔，\n也感受到了山川的壮美。\n但无论走到哪里，\n我的内心总是空荡荡的。\n渴望有人能够陪伴在我身旁，\n分享生命中的点滴欢乐与忧伤。\n或许这就是人生的意义所在，\n不在于拥有多少财富和荣誉，\n而是在于找到那个能够与自己心灵相通的人。\n让我们一起携手前行，\n寻找那片属于我们的天空。"},{"role":"user","content":"你好\n"},{"role":"assistant","content":"你好！有什么我可以帮助你的吗？"},{"role":"user","content":"请问我是谁\n"},{"role":"assistant","content":"很抱歉，作为一个认知智能模型，我无法确定您是谁。请您提供更多的信息或上下文以便我更好地回答您的问题。"},{"role":"user","content":"那你是谁\n"},{"role":"assistant","content":"您好，我是科大讯飞研发的认知智能大模型，我的名字叫讯飞星火认知大模型。我可以和人类进行自然交流，解答问题，高效完成各领域认知智能需求。"},{"role":"user","content":"你好啊\n"},{"role":"assistant","content":"你好！有什么我可以帮助你的吗？"},{"role":"user","content":"你多大了\n"},{"role":"assistant","content":"我是一个AI语言模型，没有年龄。"},{"role":"user","content":"你会什么\n"},{"role":"assistant","content":"我是一个AI语言模型，我被训练来理解和生成自然语言文本。我可以回答各种问题、提供信息和建议，但我没有实际的身体或行动能力。"},{"role":"user","content":"div最外层加了个overflow:hidden;会导致里面overflow:auto;失效\n"},{"role":"assistant","content":"是的，当最外层的div设置了overflow:hidden;时，里面的overflow:auto;将不起作用。因为overflow:hidden;会隐藏溢出的内容，导致无法滚动查看。如果需要让内部的div可以滚动查看，可以尝试将最外层的div设置为position:relative;或者overflow:scroll;。"},{"role":"user","content":"你好\n"},{"role":"assistant","content":"你好！有什么我可以帮助你的吗？"},{"role":"user","content":"div最外层加了个overflow:hidden;会导致里面overflow:auto;失效\n"},{"role":"assistant","content":"是的，如果div的最外层加上了`overflow:hidden;`，那么里面的`overflow:auto;`将不会生效。这是因为`overflow:hidden;`会隐藏超出容器范围的内容，而`overflow:auto;`则会在内容超出容器范围时显示滚动条。当最外层的`overflow`属性设置为`hidden`时，内部的滚动条将无法显示，导致`overflow:auto;`失效。"}]);
let scrollTop = ref(0)
let isShowBtn = ref(false)
onMounted(() => {
  mainRef = document.querySelector(".el-main");
  mainRef.addEventListener("scroll", (e) => {
    scrollTop.value = e.target.scrollTop;
    console.log(chatRef.value.scrollHeight - chatRef.value.clientHeight -  scrollTop.value,isShowBtn.value)
  });
  goToBottom();
});
nextTick(()=>{
   isShowBtn = computed(()=>{
    return  chatRef.value.scrollHeight - chatRef.value.clientHeight -  scrollTop.value > 300 
  })
})

function sendMsg() {
  chatList.push({
    role: "user",
    content: keyWord.value,
  });
  chatList.push({
    role: "assistant",
    content: "",
  });
  nextTick(() => {
    goToBottom();
  });
  isLoading.value = true;
  fetch("http://127.0.0.1:6594/ws/getAccessToken", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: keyWord.value,
      userId: 4,
    }),
  })
    .then((response) => {
      const decoder = new TextDecoder("utf-8");
      let buffer = [];
      isLoading.value = false;
      const reader = response.body.getReader();
      function read() {
        reader.read().then(function processText({ done, value }) {
          if (done) {
            return buffer;
          }
          const chunk = decoder.decode(value, { stream: false });
          let obj = JSON.parse(
            /\{[\s\S]*}/.exec(chunk)[0] || '{}',
          )
          goToBottom();
          chatList.at(-1).content += obj.content;
          read();
        });
      }
      return read();
    })
    .then((res) => {
      console.log('结束')
    })
    .catch((err) => {
      chatList.pop();
    });
  keyWord.value = "";
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
</script>

<style scoped lang="scss">
.chat_item_content {
  display: flex;
  align-items: baseline;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  .chat_info {
    p {
      margin: 0;
    }
  }
  :deep(.vuepress-markdown-body):not(.custom){
    padding: 10px !important;
    border-radius: 8px;
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
  background-color: #eef0f6;
}
.el-main {
  position: relative;
  height: calc(100vh - 100px);
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
