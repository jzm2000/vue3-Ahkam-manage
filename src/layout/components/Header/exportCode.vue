<template>
    <el-dialog title="导出代码" v-model="model" width="1400px">
        <v-md-editor v-model="template" height="700px" @copy-code-success="handleCopyCodeSuccess" />
    </el-dialog>
</template>

<script setup lang="ts">
import { defineModel,ref,watch } from "vue"
import {storeToRefs} from "pinia"
import useAppStore from "@/stores/app.ts"
import { ElMessage } from "element-plus";
const appStore = useAppStore();
const { AppData } = storeToRefs(appStore);
let model = defineModel();
let template =  ref<string>("");
function handleCopyCodeSuccess(val){
    ElMessage.success("复制成功")
}
function setValue(val){
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
    let verifyData = "";
    let customVerify = "";
    let scriptContent = "";

    for(let i = 0;i<arr.length;i++){
        const {componentContent} = arr[i];
        variateData+=`${componentContent.variateName}:${setValue(componentContent.defaultValue)},
        `
        verifyData+=`${componentContent.variateName}:{required:${componentContent.isRequired},${!componentContent.isCustomVerify ? `message:"${componentContent.verifyMsg}",` : ''}trigger:"blur"${componentContent.isCustomVerify ? `,validator:${componentContent.variateName}Rule` : ''}},
        `
        if(componentContent.customVerify){
            customVerify+=`${componentContent.customVerify}\n`
        }
        switch(arr[i].type){
            case "JInput":
                ElFormItem +=`
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || '' }">
                <el-input ${componentContent.InputType ? `type="${componentContent.InputType}"` :''} v-model="${formName+'.'+componentContent.variateName}" ${componentContent.prefixIcon ? `prefixIcon="${componentContent.prefixIcon}"`:''} placeholder="${componentContent.placeholder}" ${componentContent.suffixIcon ? `suffixIcon="${componentContent.suffixIcon}"` : ''} ${componentContent.maxLength ? `:maxlength="${componentContent.maxLength}"` : ''} ${componentContent.minLength ? `:minlength="${componentContent.minLength}"` : ''} ${componentContent.showWordLimit ? `:show-word-limit="${componentContent.showWordLimit}"` : ''} ${componentContent.clearable ? `:clearable="${componentContent.clearable}"` : ''} ${componentContent.showPassword ? `show-password="${componentContent.showPassword}"` : ''} ${componentContent.resize&&componentContent.InputType=='textarea' ? `resize="${componentContent.resize}"` : ''}>
                    ${componentContent.slotName ? `<template #${componentContent.slotName}>
                    {{ ${componentContent.slotContent} }}
                    </template>` : ''}
                </el-input>
            </el-form-item>`
                break;
            case "JRadio":
                let options = componentContent.options;
                let radioOptions = ""
                for(let j=0;j<options.length;j++){
                    if(componentContent.radioType=='radio'){
                        radioOptions+=`
                    <el-radio label="${options[j].label}" value="${options[j].value}" ${componentContent.border ? `:border="${componentContent.border}"` : ''}></el-radio>`
                    }else{
                        radioOptions+=`
                    <el-radio-button label="${options[j].label}" value="${options[j].value}"></el-radio-button>`
                    }
                }
                ElFormItem += `
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || ''}">
                <el-radio-group v-model="${formName+'.'+componentContent.variateName}" ${componentContent.disabled ? `:disabled="${componentContent.disabled}"` : ''} ${componentContent.size ? `size="${componentContent.size}"` : ''} ${componentContent.textColor&&componentContent.radioType == 'button' ? `text-color="${componentContent.radioType == 'button' ? componentContent.textColor : ''}"` : ''} ${componentContent.fill&&componentContent.radioType == 'button' ? `fill="${componentContent.radioType == 'button' ? componentContent.fill : ''}"` : ''}
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
                <el-select v-model="${formName+'.'+componentContent.variateName}" ${componentContent.multiple ? `:multiple="${componentContent.multiple}"` : ''} ${componentContent.clearable ? `:clearable="${componentContent.clearable}"` : ''} ${componentContent.collapseTags ? `:collapse-tags="${componentContent.collapseTags}"`:''} ${componentContent.multipleLimit ? `:multiple-limit="${componentContent.multipleLimit}"` : ''} ${componentContent.effect ? `effect="${componentContent.effect}"` : ''} ${componentContent.filterable ? `:filterable="${componentContent.filterable}"` : ''} ${componentContent.collapseTagsTooltip ? `:collapse-tags-tooltip="${componentContent.collapseTagsTooltip}"` : ''} ${componentContent.placeholder ? `placeholder="${componentContent.placeholder}"` : ''} 
                >${selectOptions}
                </el-select>
            </el-form-item>`
                break;
            case "JCheckBox":
                let options3 = componentContent.options;
                let checkBoxOptions = ""
                for(let j=0;j<options3.length;j++){
                    if(componentContent.checkBoxType == 'checkbox'){
                        checkBoxOptions+=`
                    <el-checkbox label="${options3[j].label}" value="${options3[j].value}" ${componentContent.border ? `:border="${componentContent.border}"` : ''}></el-checkbox>`
                    }else{
                        checkBoxOptions+=`
                    <el-checkbox-button label="${options3[j].label}" value="${options3[j].value}"></el-checkbox-button>`
                    }
                    
                }
                ElFormItem += `
            <el-form-item label="${componentContent.label}" prop="${componentContent.variateName}" label-width="${componentContent.labelWidth || ''}">
                <el-checkbox-group v-model="${formName+'.'+componentContent.variateName}" ${componentContent.min ? `:min="${componentContent.min}"` : ''} ${componentContent.max ? `:max="${componentContent.max}"` : ''} ${componentContent.disabled ? `:disabled="${componentContent.disabled}"` : ''} ${componentContent.size ? `size="${componentContent.size}"` : ''} ${componentContent.textColor&&componentContent.checkBoxType == 'button' ? `text-color="${componentContent.checkBoxType == 'button' ? componentContent.textColor : ''}"` : ''} ${componentContent.fill&&componentContent.checkBoxType == 'button' ? `fill="${componentContent.checkBoxType == 'button' ? componentContent.fill : ''}"` : ''}
                >${checkBoxOptions}
                </el-checkbox-group>
            </el-form-item>`
                break;
        }
    }
    scriptContent = `const ${formName} = reactive({
        ${variateData}
    })
${customVerify}
const ${AppData.value.rulesName} = {
    ${verifyData}
}`
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
import { reactive } from "vue"
  ${scriptContent}
</\script>
<style lang="scss" scoped></\style>
\`\`\`          `
    template.value = temp;
    

})

</script>

<style scoped lang="scss"></style>