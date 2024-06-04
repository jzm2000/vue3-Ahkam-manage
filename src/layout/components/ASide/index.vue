<template>
  <div class="a_side">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in tabs" :label="item.name" :name="item.value"></el-tab-pane>
    </el-tabs>
    <component :is="componentTabs.get(activeName)"></component>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance,defineComponent } from "vue";
import componentData from "@/views/panelComponent/componentData";
import formTemplate from "./formTemplate.vue"
import componentGallery from "./componentGallery.vue"
export default defineComponent({
  setup(props){
    const tabs = ref([
      {
        name:"组件内容",
        value:1
      },
      {
        name:"表单模板",
        value:2
      }
    ]);
    let activeName = ref(1);
    let componentTabs = new Map([
      [1,formTemplate],
      [2,componentGallery]
    ]);
    return {
      tabs,
      activeName,
      componentTabs
    }
  }

})

</script>

<style scoped lang="scss">
.a_side{
  :deep(.el-tabs__item) {
    width: 125px;
  }
}

</style>