<template>
  <div class="base-image-upload">
    <ul class="el-upload-list el-upload-list--picture-card">
      <li class="el-upload-list__item is-ready" v-for="(item,index) in fileList">
        <div>
          <img
            class="el-upload-list__item-thumbnail"
            :src="item"
            alt=""
          />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePreview(item)">
              <el-icon><ZoomIn /></el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="handleDownload(item)">
              <el-icon><Download /></el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="handleDelete(index)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </li>
    </ul>
    <el-upload
      class="avatar-uploader"
      action="http://60.204.237.223:6594/upload"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :show-file-list="false"
      :multiple="props.multiple"
      v-show="fileList.length===0 || props.multiple"
      >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible" title="预览图片" width="50%">
      <img :src="dialogImageUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>
 
<script setup>
import { ref, reactive, getCurrentInstance, defineComponent,defineProps,defineEmits,defineOptions,watch } from "vue";
defineOptions({
  name:"baseImageUpload"
})
let fileList = ref([]);
let dialogImageUrl = ref("");
let dialogVisible = ref(false);
const props = defineProps({
  multiple:{
    type:Boolean,
    default:false
  },
  modelValue:{
    
  },
})
const emit = defineEmits(["update:modelValue"]);
watch(()=>props.modelValue,(val)=>{
  if(val){
    if(Object.prototype.toString.call(val) == '[object Array]'){
            fileList.value = val;
    }else{
           fileList.value = [val];
    }
  }
},{deep:true,immediate:true})
function beforeUpload(file){
  return true
} 
function handleSuccess(data){  
  fileList.value.push(data.url)
  if(props.multiple){
    emit("update:modelValue",fileList.value)
  }else{
    
    emit("update:modelValue",fileList.value[0])
  }
}
function handlePreview(item){
  dialogVisible.value = true;
  dialogImageUrl.value = item;
}
function handleDownload(item){
  let a = document.createElement("a");
  a.href = item;
  a.style.display="none"
  a.download = item;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
function handleDelete(index){
  if(props.multiple){
     fileList.value.splice(index,1);
     emit("update:modelValue",fileList)
  }else{
    fileList.value = []
    emit("update:modelValue","")
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader{
  display: inline-block;
  vertical-align: top;
}
</style>
