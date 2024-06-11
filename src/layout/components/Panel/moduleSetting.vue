<template>
    <div class="module_setting" v-if="AppData.AppList.length&&currentComponent?.uid">
        <el-collapse v-model="activeName" @change="handleChange" class="form_template">
            <el-form :model="baseForm" ref="baseForm" label-position="right" :rules="rules" label-width="100px"
                size="default">
                <el-collapse-item title="基础属性" name="1">
                    <!-- 基础类型 -->
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
                    <el-form-item label="占位内容：" prop="placeholder">
                        <el-input v-model="currentComponent.componentContent.placeholder" type="text"
                            placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="是否禁用：">
                        <el-switch v-model="currentComponent.componentContent.disabled"></el-switch>
                    </el-form-item>
                    <el-form-item label="组件大小：" prop="size">
                        <el-select v-model="currentComponent.componentContent.size" placeholder="请选择" clearable>
                            <el-option value="small"></el-option>
                            <el-option value="default"></el-option>
                            <el-option value="large"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- Input框类型 -->
                    <div v-show="currentComponent.type=='JInput'">
                        <el-form-item label="输入框类型：" prop="InputType">
                            <el-select v-model="currentComponent.componentContent.InputType" value-key=""
                                placeholder="请选择" clearable>
                                <el-option label="文本" value="text"></el-option>
                                <el-option label="密码" value="password"></el-option>
                                <el-option label="文本域" value="textarea"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="可以清除：" prop="clearable"
                        v-show="['JInput','JSelect'].includes(currentComponent.type)">
                        <el-switch v-model="currentComponent.componentContent.clearable" />
                    </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="高级属性">
                    <!-- Input框类型 -->
                    <div v-show="currentComponent.type=='JInput'">
                        <div v-show="currentComponent.componentContent.InputType != 'textarea'">
                            <el-form-item label="前缀图标：">
                                <el-input v-model="currentComponent.componentContent.prefixIcon"></el-input>
                            </el-form-item>
                            <el-form-item label="后缀图标：">
                                <el-input v-model="currentComponent.componentContent.suffixIcon"></el-input>
                            </el-form-item>
                            <el-form-item label="插槽：">
                                <el-select v-model="currentComponent.componentContent.slotName" placeholder="请选择"
                                    clearable>
                                    <el-option value="prefix" label="输入框头部插槽"></el-option>
                                    <el-option value="suffix" label="输入框尾部插槽"></el-option>
                                    <el-option value="prepend" label="输入框前置插槽"></el-option>
                                    <el-option value="append" label="输入框后置插槽"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="插槽内容：">
                                <el-input v-model="currentComponent.componentContent.slotContent"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="最小长度：">
                            <el-input v-model="currentComponent.componentContent.minLength" type="number"
                                oninput="if(value<0) value=0"></el-input>
                        </el-form-item>
                        <el-form-item label="最大长度：">
                            <el-input v-model="currentComponent.componentContent.maxLength"
                                oninput="if(value<1) value=1"></el-input>
                        </el-form-item>
                        <el-form-item label="显示字数：">
                            <el-switch v-model="currentComponent.componentContent.showWordLimit"></el-switch>
                        </el-form-item>
                        <el-form-item label="缩放类型：" v-show="currentComponent.componentContent.InputType == 'textarea'">
                            <el-select v-model="currentComponent.componentContent.resize" placeholder="请选择" clearable>
                                <el-option value="none" label="不能缩放"></el-option>
                                <el-option value="both" label="水平和垂直"></el-option>
                                <el-option value="horizontal" label="水平缩放"></el-option>
                                <el-option value="vertical" label="垂直缩放"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!-- radio类型 -->
                    <div v-show="['JRadio','JCheckBox'].includes(currentComponent.type)">
                        <el-form-item label="类型：">
                            <el-select v-if="currentComponent.type=='JRadio'"
                                v-model="currentComponent.componentContent.radioType" placeholder="请选择" clearable>
                                <el-option value="radio" label="原始类型"></el-option>
                                <el-option value="button" label="按钮类型"></el-option>
                            </el-select>
                            <el-select v-else v-model="currentComponent.componentContent.checkBoxType" placeholder="请选择"
                                clearable>
                                <el-option value="checkbox" label="原始类型"></el-option>
                                <el-option value="button" label="按钮类型"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示边框：">
                            <el-switch v-model="currentComponent.componentContent.border"></el-switch>
                        </el-form-item>
                        <el-form-item label="按钮文本色："
                            v-show="currentComponent.componentContent.radioType=='button' || currentComponent.componentContent.checkBoxType=='button'">
                            <el-color-picker v-model="currentComponent.componentContent.textColor" />
                        </el-form-item>
                        <el-form-item label="按钮背景色："
                            v-show="currentComponent.componentContent.radioType=='button' || currentComponent.componentContent.checkBoxType=='button'">
                            <el-color-picker v-model="currentComponent.componentContent.fill" />
                        </el-form-item>
                    </div>
                    <!-- checkbox类型 -->
                    <div v-show="currentComponent.type == 'JCheckBox'">
                        <el-form-item label="勾选最小数量">
                            <el-input-number v-model="currentComponent.componentContent.min" :min="0" />
                        </el-form-item>
                        <el-form-item label="勾选最大数量">
                            <el-input-number v-model="currentComponent.componentContent.max" :min="0" />
                        </el-form-item>
                    </div>
                    <!-- select类型 -->
                    <div v-show="currentComponent.type=='JSelect'">
                        <el-form-item label="是否多选：">
                            <el-switch v-model="currentComponent.componentContent.multiple" @change="selectMultiple"/>
                        </el-form-item>
                        <el-form-item label="展示文字：">
                            <el-switch v-model="currentComponent.componentContent.collapseTags" />
                        </el-form-item>
                        <el-form-item label="显示选中标签" v-show="currentComponent.componentContent.collapseTags">
                            <el-switch v-model="currentComponent.componentContent.collapseTagsTooltip" />
                        </el-form-item>
                        <el-form-item label="可选数量：">
                            <el-input-number
                                v-model="currentComponent.componentContent.multipleLimit"></el-input-number>
                        </el-form-item>
                        <el-form-item label="是否搜索：">
                            <el-switch v-model="currentComponent.componentContent.filterable" />
                        </el-form-item>
                        <el-form-item label="tooltip主题：">
                            <el-select v-model="currentComponent.componentContent.effect" placeholder="请选择" clearable>
                                <el-option value="dark"></el-option>
                                <el-option value="light"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-if="['JRadio','JSelect','JCheckBox'].includes(currentComponent.type)">
                        <div class="option_setting">
                            <div class="title">选项设置</div>
                        </div>
                        <ul class="add_option">
                            <draggable :list="currentComponent.componentContent.options" :sort="true" handle=".moveIcon"
                                :group="{ name: 'options', pull: false }" item-key="id">
                                <template #item="{element,index}">
                                    <li>
                                        <el-input size="small" v-model="element.label" style="width:100px"></el-input>
                                        <el-input size="small" style="width:100px" v-model="element.value"></el-input>
                                        <el-icon class="moveIcon">
                                            <Rank />
                                        </el-icon>
                                        <el-icon style="cursor: pointer;"
                                            @click="deleteOptions(currentComponent.componentContent.options,index)">
                                            <Delete></Delete>
                                        </el-icon>
                                    </li>
                                </template>
                            </draggable>
                            <el-button link type="primary"
                                @click="addOptions(currentComponent.componentContent.options)">新增选项</el-button>
                            <el-button link type="primary" @click="exportOptions">导入选项</el-button>
                            <el-button link type="primary">重置</el-button>
                        </ul>
                        <div class="option_setting"></div>
                    </div>
                    <!-- 基础类型 -->
                    <el-form-item label="是否必填：">
                        <el-switch v-model="currentComponent.componentContent.isRequired" />
                    </el-form-item>
                    <el-form-item label="校验信息：" v-show="currentComponent.componentContent.isRequired">
                        <el-input v-model="currentComponent.componentContent.verifyMsg"></el-input>
                    </el-form-item>
                    <el-form-item label="自定义校验：">
                        <el-switch v-model="currentComponent.componentContent.isCustomVerify" />
                    </el-form-item>
                    <el-form-item label="校验规则：" v-show="currentComponent.componentContent.isCustomVerify">
                        <el-button round plain icon="EditPen" @click="visible=true">编写代码</el-button>
                    </el-form-item>
                </el-collapse-item>
            </el-form>
        </el-collapse>
    </div>
    <!-- 校验规则 -->
    <AceEditor v-model:visible="visible" v-model:content="currentComponent.componentContent.customVerify"></AceEditor>
    <!-- 导入选项 -->
    <AceEditor v-model:visible="visible2" lang="json" :content="content" @handleInput="handleInput">
    </AceEditor>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance,defineComponent,watch,shallowReactive } from "vue";
import AceEditor from "@/components/AceEditor/index.vue"
import useAppStore from "@/stores/app.ts"
import {storeToRefs} from "pinia"
import draggable from "vuedraggable"
let activeName = ref("1");
const appStore = useAppStore();
const rules = shallowReactive({
    formName:{ required:true, message:"请输入表单名称", trigger:"blur"}
})
let visible = ref<boolean>(false);
let visible2 = ref<boolean>(false);
let content  = ref();
const baseForm = reactive({
        
})
const baseRefForm = ref<string>("")
const { currentComponent } = storeToRefs(appStore);
const {AppData} = storeToRefs(appStore);

function handleChange(){
    
}
function exportOptions(){
    console.log();
    content.value = setJson(currentComponent.value.componentContent.options)
    visible2.value = true;
}
function setJson(arr){
    let str="["
    let len = arr.length;
    arr.forEach((arr,index)=>{
        if(len==index+1){
            str += `\n  ${JSON.stringify(arr)}\n]`
        }else{
            str += `\n  ${JSON.stringify(arr)},`
        }
    })
    return str
}
function handleInput(array){
    currentComponent.value.componentContent.options = array
}
function deleteOptions(options,index){
    options.splice(index,1)
}
function addOptions(options){
    let len = options.length;
    len++;
    options.push({
        label:"选项"+len,
        value:len
    })
}
function selectMultiple(val){
    if(val){
        currentComponent.value.componentContent.defaultValue = [];
    }else{
         currentComponent.value.componentContent.defaultValue = "";
    }
}
</script>

<style scoped lang="scss">
.moveIcon {
    cursor: move;
}

.module_setting {
    padding: 0 10px;
}

.option_setting {
    position: relative;
    height: 1px;
    text-align: center;
    border-top: 1px solid #dcdfe5;
    margin: 20px 0;

    .title {
        position: absolute;
        background-color: #fff;
        padding: 0 20px;
        font-weight: 500;
        color: #333;
        font-size: 14px;
        left: 50%;
        transform: translate(-50%) translateY(-50%);
    }
}

.add_option {
    width: 100%;

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
</style>