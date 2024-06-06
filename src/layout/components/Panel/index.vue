<template>
  <div class="panel_container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="组件设置" name="moduleSetting"></el-tab-pane>
      <el-tab-pane label="表单设置" name="formSetting"></el-tab-pane>
    </el-tabs>
    <el-scrollbar style="height: calc(100vh - 114px);">
      <component :is="componentTabs.get(activeName)"></component>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'
import {storeToRefs} from "pinia"
import formSetting from "./formSetting.vue"
import moduleSetting from "./moduleSetting.vue"
import useAppStore from "@/stores/app.ts"
const componentTabs = new Map([
  ['moduleSetting',moduleSetting],
  ['formSetting',formSetting]
])
const appStore = useAppStore();
let activeName = ref<string>("moduleSetting");

</script>

<style scoped lang="scss">
.panel_container {
  :deep(.el-tabs__item) {
    width: 125px;
  }
}
</style>