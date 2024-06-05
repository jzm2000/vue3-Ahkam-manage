<template>
  <div class="component_gallery">
    <ul>
      <li class="gallery_item" v-for="item in templateList" @click="handleSelect(item)">
        <p>{{item.tempName}}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import useAppStore from "@/stores/app.ts"
import {storeToRefs} from "pinia";
const appStore  = useAppStore();
const {templateList} = storeToRefs(appStore);

function handleSelect(item){
  appStore.setAppData(item);
}
</script>

<style scoped lang="scss">
.component_gallery{
  padding:5px;
}
.gallery_item{
  height:200px;
  line-height:200px;
  text-align:center;
  font-size:14px;
  color:var(--el-color-primary);
  border: 1px solid #bbb;
  border-radius:4px;
  margin-bottom:12px;
  cursor:pointer;
  transition: box-shadow 0.3s;
  &:hover{
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  }
}
</style>