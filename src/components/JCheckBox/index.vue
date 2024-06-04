<template>
    <el-checkbox-group v-model="model" multiple>
        <el-checkbox v-for="item in props.componentContent.options" :label="item.label" :value="item.value"></el-checkbox>
    </el-checkbox-group>
</template>

<script setup>
import { ref, reactive, defineModel, defineProps } from "vue";
const props = defineProps({
    componentContent: {
        type: Object
    }
})
import useAppStore from "@/stores/app.ts";
const appStore = useAppStore();
console.log(props.componentContent);
const model = defineModel();
console.log(model);
</script>

<style scoped lang="scss"></style>