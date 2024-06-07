<template>
    <el-select v-model="model" :multiple="props.componentContent.multiple" :clearable="props.componentContent.clearable"
        :collapse-tags="props.componentContent.collapseTags" :multiple-limit="props.componentContent.multipleLimit"
        :effect="props.componentContent.effect" :filterable="props.componentContent.filterable"
        :collapse-tags-tooltip="props.componentContent.collapseTagsTooltip" :placeholder="props.componentContent.placeholder">
        <el-option v-for="item in props.componentContent.options" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup lang="ts">
import { ref, reactive, defineModel, defineProps } from "vue";
import type { PropsType } from "../../interface/component.ts"
const props = defineProps<PropsType>();
const model = defineModel({ default: "" })
import useAppStore from "@/stores/app.ts";
const appStore = useAppStore();
</script>

<style scoped lang="scss"></style>