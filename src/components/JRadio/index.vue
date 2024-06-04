<template>
    <el-radio-group v-model="model">
        <el-radio v-for="item in props.componentContent.options" :label="item.label" :value="item.value"></el-radio>
    </el-radio-group>
</template>

<script setup>
import {ref,reactive,defineModel,defineProps} from "vue";
const props = defineProps({
    componentContent:{
        type:Object
    }
})
import useAppStore from "@/stores/app.ts";
const appStore = useAppStore();
console.log(props.componentContent);
const model = defineModel({default:""});
</script>

<style scoped lang="scss"></style>