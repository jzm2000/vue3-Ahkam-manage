<template>
  <div>
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
    <el-upload action="http://60.204.237.223:6594/upload">
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
</template>

<script>
import { EventBus } from "@/utils/EventBus.ts";
import { ref, reactive, defineComponent, watch, onMounted } from "vue";
export default defineComponent({
  setup() {
    let imageUrl = ref("");
    let fileList = ref("");
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
      let num = 1024 * 1024;
      let chunks = [];
      for (let i = 0; i < file.size; i += num) {
        chunks.push(file.slice(i, i + num));
      }
      let reqList = [];
      for (let i = 0; i < chunks.length; i++) {
        const FD = new FormData();
        FD.append("file", chunks[i], file.name + "-" + i);
        reqList.push({
          url: "http://60.204.237.223:6594/uploadMerge",
          body: FD,
        });
        if (i === chunks.length - 1) {
          const FD2 = new FormData();
          FD2.append("file", chunks[i], file.name + "-" + i);
          FD2.append("isEnd", true);
          reqList.push({
            url: "http://60.204.237.223:6594/uploadMerge",
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
      fetch("http://60.204.237.223:6594/uploadMutiple", {
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
    onMounted(() => {});
    let str = `非常抱歉，我误解了你之前所说的信息。以下是南昌市明天的天气预报：\n\n天气状况：多云转阵雨\n气温范围：25℃~31℃\n风向和风力：南风转东南风，微风\n日出时间：06:48\n日落时间：18:17\n\n请注意，由于天气状况可能会发生变化，建议您在出门前再次查看最新的天气预报。`;
    function setWriting(str, callback, successBack,options={ num:1,speed:50 }) {
      options = {
        num: options.num || 1,
        speed: options.speed || 50,
      }
      let arr = str.split("");
      let strAll = "";
      let index = 0;
      let len = arr.length;
      function getRequest() {
        strAll += arr[index];
        if (index < len) {
          setTimeout(() => {
            callback(arr.slice(index,index+options.num));
            index += options.num;
            getRequest();
          }, options.speed);
        } else {
          successBack();
        }
      }
      getRequest();
    }

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
      msg,
    };
  },
});
</script>

<style scoped lang="scss"></style>
