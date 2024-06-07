<template>
    <el-checkbox-group v-model="model" :size="props.componentContent.size"
        :[hasMinKey]="props.componentContent.min" :[hasMaxKey]="props.componentContent.max"
        :text-color="props.componentContent.checkBoxType == 'button' ? props.componentContent.textColor : ''"
        :fill="props.componentContent.checkBoxType == 'button' ? props.componentContent.fill : ''">
        <el-checkbox :border="props.componentContent.border" v-for="item in props.componentContent.options"
            :label="item.label" :value="item.value"
            v-if="props.componentContent.checkBoxType == 'checkbox'"></el-checkbox>
        <el-checkbox-button v-for="item in props.componentContent.options" :label="item.label" :value="item.value"
            v-else>
        </el-checkbox-button>
    </el-checkbox-group>
</template>

<script lang="ts" setup>
import { ref, reactive, defineModel, defineProps,computed } from "vue";
import type {PropsType} from "../../interface/component.ts"
const props = defineProps<PropsType>()
import useAppStore from "@/stores/app.ts";
const appStore = useAppStore();
const model = defineModel();
const hasMinKey = computed(()=>{
    return props.componentContent.min ? 'min' : ''
})
const hasMaxKey = computed(()=>{
    return props.componentContent.max ? 'max' : ''
})
</script>

<style scoped lang="scss"></style>