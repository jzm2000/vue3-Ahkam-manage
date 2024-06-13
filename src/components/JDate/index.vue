<template>
  <el-date-picker v-model="model" type="date" :placeholder="props.componentContent.placeholder"
    :size="props.componentContent.size"></el-date-picker>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import type {PropsType} from "../../interface/component.ts"
import useAppStore from "@/stores/app.ts"
const props = defineProps<PropsType>()
let model = defineModel<string|array>();
const appStore = useAppStore();
console.log(appStore);
</script>

<style scoped lang="scss">
.el-date-picker{
  width:100%;
}
</style>