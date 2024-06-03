<template>
    <div class="module_setting">
        <el-collapse v-model="activeName" @change="handleChange" class="form_template">
            <el-collapse-item title="基础属性" name="1">
                <el-form :model="baseForm" ref="baseForm" :label-position="AppData.labelPosition" :rules="rules"
                    size="default">
                    <el-form-item label="变量名称：" prop="variateName">
                        <el-input v-model="currentComponent.variateName" type="text" placeholder="请输入表单名称" />
                    </el-form-item>
                    <el-form-item label="标签对齐方式：" prop="labelPosition">
                        <el-radio-group v-model="currentComponent.labelPosition">
                            <el-radio-button value="left">左</el-radio-button>
                            <el-radio-button value="top">上</el-radio-button>
                            <el-radio-button value="right">右</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标签宽度：" prop="defaultValue">
                        <el-input v-model="currentComponent.labelWidth" type="text" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="默认值：" prop="defaultValue">
                        <el-input v-model="currentComponent.defaultValue" type="text" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="输入框类型：" prop="InputType">
                        <el-select v-model="currentComponent.InputType" value-key="" placeholder="请选择" clearable>
                            <el-option label="文本" value="text"></el-option>
                            <el-option label="密码" value="password"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="占位内容：" prop="placeholder">
                        <el-input v-model="currentComponent.placeholder" type="text" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="组件大小：" prop="size">
                        <el-select v-model="currentComponent.size" placeholder="请选择" clearable>
                            <el-option value="small"></el-option>
                            <el-option value="default"></el-option>
                            <el-option value="large"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance,defineComponent,watch,shallowReactive } from "vue";
import useAppStore from "@/stores/app.ts"
import {storeToRefs} from "pinia"
let activeName = ref("1");
const appStore = useAppStore();
const rules = shallowReactive({
    formName:{ required:true, message:"请输入表单名称", trigger:"blur"}
})
const baseForm = reactive({
        
})
const baseRefForm = ref<string>("")
const { currentComponent } = storeToRefs(appStore);
const {AppData} = storeToRefs(appStore);
console.log(AppData);
function handleChange(){
    
}
</script>

<style scoped lang="scss">
.module_setting{
    padding:0 10px;
}
</style>