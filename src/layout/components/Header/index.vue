<template>
  <div class="header">
    <div class="aside_header">

    </div>
    <div class="operation_btns">
      <div class="left_device">
        <el-radio-group v-model="deviceType">
          <el-radio-button label="PC" :value="1"></el-radio-button>
          <el-radio-button label="H5" :value="2"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="right_function">
        <el-button type="primary" @click="clearComponent">清空组件</el-button>
        <el-button @click="handlePreview">预览</el-button>
        <el-button>导入</el-button>
        <el-button @click="handleExportCode">导出代码</el-button>
        <el-button @click="testDialog=true">测试表单</el-button>
      </div>
    </div>
    <div class="panel_header"></div>
  </div>
  <previewForm v-model="formVisible"></previewForm>
  <exportCode v-model="codeVisible"></exportCode>
  <!-- 测试代码 -->
  <test v-model="testDialog"></test>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue"
import previewForm from "./previewForm.vue";
import exportCode from "./exportCode.vue"
import test from "@/views/test.vue"
import { ElMessageBox,ElMessage } from "element-plus";
import useAppStore from "@/stores/app.ts";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
let {deviceType} = storeToRefs(appStore);
const {AppData} = storeToRefs(appStore)
let formVisible = ref<boolean>(false);
let codeVisible = ref<boolean>(false);
let testDialog = ref<boolean>(false)
function clearComponent(){
  ElMessageBox.confirm(
    '是否清空?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '操作成功',
      });
      appStore.delAppData();
    })
    .catch(() => {

    })

}
function handleExportCode(){
  codeVisible.value = true;
}
function handlePreview(){
  formVisible.value = true;
}
onMounted(()=>{
  
})
</script>

<style scoped lang="scss">
.header{
  display: flex;
  align-items: center;
  height: 100%;
  .aside_header{
    width: 250px;
  }
  .panel_header{
    width:280px;
  }
  .operation_btns {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    flex: 1 auto;
  }
}

</style>