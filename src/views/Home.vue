<template>
  <div>
    <div style="display:flex;align-items:flex-start;">
      <el-button @click="handleClick">发送事件</el-button>
      <el-button @click="handleOff">解除事件</el-button>
      <el-button @click="handleBind">重新绑定</el-button>
      <el-upload
        :http-request="httpRequest"
        action="http://60.204.237.223:6594/upload"
        class="avatar-uploader"
        ref="upload"
        :multiple="false"
        :before-upload="beforeUpload"
      >
        <el-button slot="trigger" type="primary">分片上传</el-button>
      </el-upload>
      <el-upload action="http://127.0.0.1:8848/upload">
        <el-button slot="trigger">单图片上传</el-button>
      </el-upload>
      <el-upload action="" multiple :http-request="httpRequest2">
        <el-button slot="trigger">多图片上传</el-button>
      </el-upload>
      <el-button @click="uploadMultiple">开始多图片上传</el-button>
      <baseImageUpload v-model="fileList" multiple></baseImageUpload>

      <el-input
        v-model="msg"
        @keyup.enter="sendMsg"
        style="width: 200px"
      ></el-input>
    </div>
    <!-- <div class="box_over">
      <ul>
        <li v-for="(item,index) in 10" :style="`background:rgb(${255 * Math.random() * 2},${255 * Math.random() * 2},${255*Math.random() * 4})`">{{index}}</li>
      </ul>
    </div> -->
    <div class="box">
            <el-button type="primary" @click="shareToqq">分享到QQ</el-button>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/utils/EventBus.ts";
import { ref, reactive, defineComponent, watch, onMounted } from "vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            // 当元素进入视口时
            if (entry.isIntersecting) {
              console.log("元素进入", entry.target.textContent);
              entry.target.style.transform = "translateX(0px)";
              entry.target.style.opacity = 1;
            } else {
              // 当元素离开视口时
              let i = Math.floor(Math.random() * 2);
              console.log("元素消失", entry.target.textContent);
              entry.target.style.transform = `translateX(${i ? 100 : -100}px)`;
              entry.target.style.opacity = 0;
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.1, // 你可以调整这个值来控制元素与视口的交叉程度
        },
      );
      document.querySelectorAll("li").forEach((item) => {
        observer.observe(item);
      });
    });

    let imageUrl = ref("");
    let fileList = ref([]);
    let msg = ref("");
    const $bus = new EventBus();
    $bus.on("greet", func);
    function func(arg) {
      console.log(arg);
    }
    function handleClick() {
      $bus.emit("greet", "word");
      console.log($bus);
    }
    function handleOff() {
      $bus.remove("greet");
      $bus.emit("greet", "word");
    }
    function handleBind() {
      $bus.on("greet", func);
    }
    function beforeUpload(file) {
      return true;
    }
    function httpRequest({ file }) {
      let num = 1024 * 1024;//1MB
      let chunks = [];
      for (let i = 0; i < file.size; i += num) {
        chunks.push(file.slice(i, i + num));
      }
      let reqList = [];
      for (let i = 0; i < chunks.length; i++) {
        const FD = new FormData();
        FD.append("file", chunks[i], file.name + "-" + i);
        reqList.push({
          url: `${import.meta.env.VITE_APP_URL}/uploadMerge`,
          body: FD,
        });
        if (i === chunks.length - 1) {
          const FD2 = new FormData();
          FD2.append("file", chunks[i], file.name + "-" + i);
          FD2.append("isEnd", true);
          reqList.push({
            url:`${import.meta.env.VITE_APP_URL}/uploadMerge`,
            body: FD2,
          });
        }
      }
      processRequest(reqList, reqList.length, 1);
      async function processRequest(list, size, num) {
        const newList = list.slice(num - 1, num);
        const chunks = [];
        newList.forEach((item) => {
          chunks.push(sendRequest(item));
        });
        let arr = await Promise.all(chunks);
        if (arr.at(-1)) {
          imageUrl.value = arr.at(-1).url;
        }
        num += 1;
        if (num < list.length + 1) {
          processRequest(list, size, num);
        }
      }

      function sendRequest(item) {
        return new Promise((resolve, reject) => {
          fetch(item.url, {
            method: "post",
            body: item.body,
          })
            .then((res) => {
              if (res.status == 204) return null;
              return res.json();
            })
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    }
    function httpRequest2({ file }) {
      console.log(file);
      fileList.value.push(file);
    }
    function uploadMultiple() {
      let FD = new FormData();
      fileList.value.forEach((item) => {
        FD.append("fileList", item);
      });
      fetch(`${import.meta.env.VITE_APP_URL}/uploadMutiple`, {
        method: "post",
        body: FD,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
      console.log(fileList.value);
    }
    // const ws = new WebSocket("ws://127.0.0.1:8181/ws");
    // ws.onopen = function () {
    //   console.log("连接成功");
    // }
    // ws.onmessage = function (e) {
    //   console.log(e.data);
    // }
    function sendMsg() {
      fetch("http://127.0.0.1:6594/ws/getAccessToken", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: msg.value,
          userId: 3,
        }),
      })
        .then((response) => {
          const decoder = new TextDecoder("utf-8");
          let buffer = [];
          const reader = response.body.getReader();
          function read() {
            reader.read().then(function processText({ done, value }) {
              if (done) {
                return buffer;
              }
              const chunk = decoder.decode(value, { stream: false });
              buffer.push(buffer);
              console.log(chunk);
              read();
            });
          }
          return read();
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      console.log(msg.value);
    }
    //分享到qq
    // function shareToqq(event){
    //   event.preventDefault();
    //   var _shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html?';
    //       _shareUrl += 'url=' + encodeURIComponent("https://www.cnblogs.com/jzm2842688813/p/18249133");   //分享的链接
    //       _shareUrl += '&title=' + encodeURIComponent("JavaScript实现发布与订阅");     //分享的标题
    //   window.open(_shareUrl,'_blank');
    //   // navigator.share({
    //   //   title: '分享的标题',
    //   //   text: '分享的文本内容',
    //   //   url: 'https://www.cnblogs.com/jzm2842688813/p/18249133'
    //   // }).then(() => {
    //   //   console.log('Successful share');
    //   // }).catch(error => {
    //   //   console.log('Error sharing:', error);
    //   // });
    // }
    onMounted(() => {

    });


    return {
      imageUrl,
      fileList,
      uploadMultiple,
      handleClick,
      handleOff,
      handleBind,
      beforeUpload,
      httpRequest,
      httpRequest2,
      sendMsg,
      // shareToqq,
      msg,
    };
  },
});
</script>

<style scoped lang="scss">
.box_over {
  position: relative;
  border: 1px solid #000;
  float: left;
  height: 400px;
  width: 400px;
  overflow: auto;
  ul {
    overflow: hidden;
    li {
      line-height: 100px;
      text-align: center;
      transition: all 1s ease-in;
      overflow: hidden;
      &::before{
        content:"";
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        top: 50%;
        width:0;
        height:0;
        transition: all 0.5s ease;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.3);
        // border-radius: 50%;
        z-index: -1;
      }
      &:hover::before{
        width:140%;
        height:140%;
      }
    }
  }
}
</style>
