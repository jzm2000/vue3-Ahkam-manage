<template>
  <div>
    <el-button @click="handleClick">发送事件</el-button>
    <el-button @click="handleOff">解除事件</el-button>
    <el-button @click="handleBind">重新绑定</el-button>
    <el-upload :http-request="httpRequest" action="http://60.204.237.223:6594/upload" class="avatar-uploader"
      ref="upload" :multiple="false" :before-upload="beforeUpload">
      <el-button slot="trigger" type="primary">分片上传</el-button>
    </el-upload>
    <el-upload action="http://60.204.237.223:6594/upload">
      <el-button slot="trigger">单图片上传</el-button>
    </el-upload>
    <el-upload  action="" multiple :http-request="httpRequest2">
      <el-button slot="trigger">多图片上传</el-button>
    </el-upload>
    <el-button @click="uploadMultiple">开始多图片上传</el-button>
    <baseImageUpload v-model="fileList" multiple></baseImageUpload>
  </div>
</template>

<script>
import { EventBus } from "@/utils/EventBus.ts"
import { ref, reactive, defineComponent,watch } from "vue";

var myInit = {
  method: 'post',
  headers: {
    "Content-Type": 'multipart/form-data'
  },
  cache: 'default',
  body: {}
};
export default defineComponent({
  setup() {
    let imageUrl = ref("");
    let fileList = ref("https://60.204.237.223:9421/down/U58APtCl29rA?fname=/1720145094611.jpg")

    const $bus = new EventBus();
    $bus.on("greet", func)
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
      $bus.on("greet", func)
    }
    function beforeUpload(file) {

      return true
    }
    function httpRequest({ file }) {
      
      let num = 1024 * 1024
      let chunks = [];
      for (let i = 0; i < file.size; i += num) {
        chunks.push(file.slice(i, i + num));
      };
      let reqList = [];
      for (let i = 0; i < chunks.length; i++) {
        const FD = new FormData();
        FD.append("file", chunks[i], file.name + "-" + i);
        reqList.push({
          url: "http://60.204.237.223:6594/uploadMerge",
          body: FD
        });
        if (i === chunks.length - 1) {
          const FD2 = new FormData();
          FD2.append("file", chunks[i], file.name + "-" + i);
          FD2.append("isEnd", true)
          reqList.push({
            url: "http://60.204.237.223:6594/uploadMerge",
            body: FD2
          })
        }
      };
      processRequest(reqList, reqList.length, 1);
      async function processRequest(list, size, num) {
        const newList = list.slice(num - 1, num);
        const chunks = [];
        newList.forEach(item => {
          chunks.push(sendRequest(item))
        })
        let arr = await Promise.all(chunks);
        if (arr.at(-1)){
          imageUrl.value = arr.at(-1).url
        }
        num += 1;
        if (num < list.length + 1) {
          processRequest(list, size, num)
        }
      }

      function sendRequest(item) {
        return new Promise((resolve, reject) => {
          fetch(item.url, {
            method: "post",
            body: item.body,
          }).then(res => {
            if (res.status==204) return null;
            return res.json();
          }).then(res=>{
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }

    }
    function httpRequest2({file}){
      console.log(file);
      fileList.value.push(file)
    }
    function uploadMultiple(){
      let FD = new FormData();
      fileList.value.forEach(item=>{
        FD.append("fileList",item)
      });
      fetch("http://60.204.237.223:6594/uploadMutiple",{
        method:"post",
        body: FD
      }).then(res=>res.json()).then(res=>{
        console.log(res);
      })
      console.log(fileList.value);
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
      httpRequest2
    }
  }
})

</script>

<style scoped lang="scss"></style>
