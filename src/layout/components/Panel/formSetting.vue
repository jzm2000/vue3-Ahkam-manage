<template>
    <div class="form_setting">
        <el-form :model="baseForm" ref="baseForm" :rules="rules" label-width="90px" :inline="false">
            <el-form-item label="全局尺寸：">
                <el-select v-model="AppData.size" placeholder="请选择" clearable>
                    <el-option value="small"></el-option>
                    <el-option value="default"></el-option>
                    <el-option value="large"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签对齐：" prop="labelPosition">
                <el-radio-group v-model="AppData.labelPosition">
                    <el-radio-button value="left">左</el-radio-button>
                    <el-radio-button value="top">上</el-radio-button>
                    <el-radio-button value="right">右</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签宽度：">
                <el-input-number v-model="AppData.labelWidth" :min="0" :max="1000" />
            </el-form-item>
            <el-form-item label="表单名称：">
                <el-input v-model="AppData.formName"></el-input>
            </el-form-item>
            <el-form-item label="表单Ref：">
                <el-input v-model="AppData.RefFormName"></el-input>
            </el-form-item>
            <el-form-item label="rules名称：">
                <el-input v-model="AppData.rulesName"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive,ref,shallowReactive } from 'vue';
import useAppStore from "@/stores/app.ts"
import {storeToRefs} from "pinia"
const appStore = useAppStore();

const { AppData } = storeToRefs(appStore);
const baseForm = reactive({
    size: "default",
    labelPosition: "left",
    labelWidth: 0,
    formName: "formSetting",
    RefFormName: "formRef",
    rulesName:"rules"
})
const rules = shallowReactive({
    
})
</script>

<style scoped lang="scss">
.form_setting{
    padding: 0 10px;
}
</style>