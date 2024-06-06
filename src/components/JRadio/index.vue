<template>
    <el-radio-group v-model="model" :size="props.componentContent.size"
        :text-color="props.componentContent.radioType == 'button' ? props.componentContent.textColor : ''"
        :fill="props.componentContent.radioType == 'button' ? props.componentContent.fill : ''">
        <el-radio v-for="item in props.componentContent.options" :label="item.label" :value="item.value"
            :border="props.componentContent.border" v-if="props.componentContent.radioType=='radio'"></el-radio>
        <el-radio-button v-for="item in props.componentContent.options" :label="item.label" :value="item.value"
            v-else></el-radio-button>
    </el-radio-group>
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
const model = defineModel({ default: "" });
</script>

<style scoped lang="scss"></style>