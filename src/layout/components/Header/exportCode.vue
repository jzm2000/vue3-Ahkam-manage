<template>
    <el-dialog title="导出代码" v-model="model" width="1400px">
        <v-md-editor v-model="template" height="700px" @copy-code-success="handleCopyCodeSuccess" />
    </el-dialog>
</template>

<script setup lang="ts">
import { defineModel,ref,watch } from "vue"
import {storeToRefs} from "pinia"
import useAppStore from "@/stores/app.ts"
const appStore = useAppStore();
const { AppData } = storeToRefs(appStore);
let model = defineModel();
let template =  ref<string>("");
function handleCopyCodeSuccess(val){
    console.log(val);
}
function setValue(val){
    console.log(Object.prototype.toString.call(val));
    if(Object.prototype.toString.call(val) == '[object String]'){
        if(!val) return "''"
        return val
    }else if(Object.prototype.toString.call(val) == '[object Array]'){
        if(!val.length) return "[]"
        return `[${val}]`
    }else if(Object.prototype.toString.call(val) == '[object Object]'){
        if(!Object.keys(val).length) return "{}"
        return val
    }else if(Object.prototype.toString.call(val) == '[object Number]'){
        return val
    }
}
watch(model,(val)=>{
    if(!val) return;
    const arr = AppData.value.AppList;
    let formName = AppData.value.formName
    let ElFormItem = "";
    let styleContent = "";
    let variateData = "";
    let scriptContent = "";

    for(let i = 0;i<arr.length;i++){
        const {componentContent} = arr[i];
        variateData+=`${componentContent.variateName}:${setValue(componentContent.defaultValue)}
        `
        switch(arr[i].type){
            case "JInput":
                ElFormItem +=`
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || '' }">
                <el-input 
                  v-model="${formName+'.'+componentContent.variateName}"
                  type="${componentContent.InputType}"
                  placeholder="${componentContent.placeholder}"
                  size="${componentContent.size}"
                  :disabled="${componentContent.isDisabled}"
                /> 
            </el-form-item>`
                break;
            case "JRadio":
                let options = componentContent.options;
                let radioOptions = ""
                for(let j=0;j<options.length;j++){
                    radioOptions+=`
                    <el-radio label="${options[j].label}" value="${options[j].value}"></el-radio>`
                }
                ElFormItem += `
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || ''}">
                <el-radio-group 
                  v-model="${formName+'.'+componentContent.variateName}" 
                  :disabled="${componentContent.isDisabled}"
                >${radioOptions}
                </el-radio-group>
            </el-form-item>`
                break;
            case "JSelect":
                let options2 = componentContent.options;
                let selectOptions = ""
                for(let j=0;j<options2.length;j++){
                    selectOptions+=`
                    <el-option label="${options2[j].label}" value="${options2[j].value}"></el-option>`
                }
                ElFormItem += `
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || ''}">
                <el-select 
                  v-model="${formName+'.'+componentContent.variateName}" 
                  :disabled="${componentContent.isDisabled}" 
                  placeholder="${componentContent.placeholder}"
                >${selectOptions}
                </el-select>
            </el-form-item>`
                break;
            case "JCheckBox":
                let options3 = componentContent.options;
                let checkBoxOptions = ""
                for(let j=0;j<options3.length;j++){
                    checkBoxOptions+=`
                    <el-checkbox label="${options3[j].label}" value="${options3[j].value}"></el-checkbox>`
                }
                ElFormItem += `
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || ''}">
                <el-checkbox-group 
                  v-model="${formName+'.'+componentContent.variateName}" 
                  :disabled="${componentContent.isDisabled}"
                >${checkBoxOptions}
                </el-checkbox-group>
            </el-form-item>`
                break;
        }
    }
    scriptContent = `const ${formName} = reactive({
        ${variateData}
    })`
    let temp =`\`\`\`vue
<template>
    <el-form 
        :model="${formName}" 
        ref="${AppData.value.RefFormName}" 
        :rules="${AppData.value.rulesName}" 
        label-width="${AppData.value.labelWidth || ''}" 
        label-position="${AppData.value.labelPosition}" 
        size="${AppData.value.size}" 
        :disabled="${AppData.value.isDisabled}"
    >
    ${ElFormItem}
    </el-form>
</template>
<script setup>
  ${scriptContent}
</\script>
<style lang="scss" scoped></\style>
\`\`\`          `
    template.value = temp;
    

})

</script>

<style scoped lang="scss"></style>