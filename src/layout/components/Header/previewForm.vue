<template>
    <el-dialog title="预览表单" v-model="formVisible" width="600px" :close-on-click-modal="false">
        <div>
            <el-form :model="form" ref="formRef" :rules="AppData.rules" :label-width="AppData.labelWidth"
                :label-position="AppData.labelPosition" :size="AppData.size">
                <el-form-item :label="item.componentContent.label" :label-width="item.componentContent.labelWidth"
                    :key="item.uid" v-for="(item,index) in form.AppList" :prop="`AppList[${index}].componentContent.defaultValue`">
                    <component :is="item.type" :key="item.uid"
                        :type="item.type=='JInput' ? item.componentContent.InputType : ''"
                        :placeholder="item.componentContent.placeholder" :size="item.componentContent.size"
                        :componentContent="item.componentContent" v-model="item.componentContent.defaultValue">
                    </component>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" style="text-align: center;">
            <el-button type="primary" @click="getFormData">获取数据</el-button>
            <el-button type="primary" @click="handleReset">重置表单</el-button>
            <el-button @click="formVisible = false">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看数据" v-model="dateVisible" width="600px">
        <json-viewer boxed copyable :value="formData"></json-viewer>
    </el-dialog>
</template>

<script setup lang="ts">
import {ref,reactive,defineModel,watch} from "vue"
import {storeToRefs} from "pinia"
import useAppStore from "@/stores/app.ts"
const appStore = useAppStore();
let formVisible = defineModel({default:false});
let dateVisible = ref<boolean>(false);
const { AppData } = storeToRefs(appStore);
const form = reactive({
    AppList:[]
});
const formRef = ref();
const formData = reactive({});
let formName = ref(AppData.formName);
for(let val in AppData.value){
        form[val] = JSON.parse(JSON.stringify(AppData.value[val]))
    };
watch(formVisible,(val)=>{
    for(let val in AppData.value){
        form[val] = JSON.parse(JSON.stringify(AppData.value[val]))
    };
})
function handleReset(){
    formRef.value.resetFields();
}
function getFormData(){
    dateVisible.value = true;
    for(let val in formData){
        delete formData[val]
    }
    form.AppList.forEach(item=>{
        formData[item.componentContent.variateName] = item.componentContent.defaultValue;
    })
    console.log(formData);
}
</script>

<style scoped lang="scss"></style>