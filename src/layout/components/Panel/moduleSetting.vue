<template>
    <div class="module_setting" v-if="AppData.AppList.length&&currentComponent.uid">
        <el-collapse v-model="activeName" @change="handleChange" class="form_template">
            <el-collapse-item title="基础属性" name="1">
                <el-form :model="baseForm" ref="baseForm" label-position="right" :rules="rules" label-width="100px"
                    size="default">
                    <el-form-item label="变量名称：" prop="variateName">
                        <el-input v-model="currentComponent.componentContent.variateName" type="text"
                            placeholder="请输入表单名称" />
                    </el-form-item>
                    <el-form-item label="标签名称：" prop="label">
                        <el-input v-model="currentComponent.componentContent.label" type="text" placeholder="请输入表单名称" />
                    </el-form-item>
                    <el-form-item label="标签宽度：" prop="defaultValue">
                        <el-input v-model="currentComponent.componentContent.labelWidth" type="text"
                            placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="默认值：" prop="defaultValue">
                        <el-input v-model="currentComponent.componentContent.defaultValue" type="text"
                            placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="输入框类型：" prop="InputType" v-show="currentComponent.type=='JInput'">
                        <el-select v-model="currentComponent.componentContent.InputType" value-key="" placeholder="请选择"
                            clearable>
                            <el-option label="文本" value="text"></el-option>
                            <el-option label="密码" value="password"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="占位内容：" prop="placeholder">
                        <el-input v-model="currentComponent.componentContent.placeholder" type="text"
                            placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="组件大小：" prop="size">
                        <el-select v-model="currentComponent.componentContent.size" placeholder="请选择" clearable>
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