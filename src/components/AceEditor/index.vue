<template>
  <el-dialog v-model="visible" title="校验规则" width="600px" :close-on-click-modal="false">
    <span class="warning">校验方法名应该为对应的变量名加Rule,例如(name)，const nameRule = (rule, value, callback) => {}</span>
    <VAceEditor v-model:value="content" theme="monokai" ref="editor" :options="options" class="vue-ace-editor"
      lang="javascript">
    </VAceEditor>
    <template #footer>
      <el-button type="primary" @click="handleSave">语法校验</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import "./aceConfig.js"
import {ElMessage} from "element-plus"
import {ref,reactive,defineModel,onMounted,watch} from "vue";
import { VAceEditor } from "vue3-ace-editor";
import type { Ace } from "ace-builds";
import { l } from "vite/dist/node/types.d-aGj9QkWt.js";
let visible = defineModel("visible",{default:""});
let content = defineModel("content",{default:""});
let editor = ref();

const options: Partial<Ace.EditorOptions> = reactive({
  useWorker: true, // 启用语法检查,必须为true
  enableBasicAutocompletion: true, // 自动补全
  enableLiveAutocompletion: true, // 智能补全
  enableSnippets: true, // 启用代码段
  showPrintMargin: false, // 去掉灰色的线，printMarginColumn
  highlightActiveLine: true, // 高亮行
  highlightSelectedWord: true, // 高亮选中的字符
  tabSize: 4, // tab锁进字符
  fontSize: 14, // 设置字号
  wrap: false, // 是否换行
  readonly: true, // 是否可编辑
  // minLines: 10, // 最小行数，minLines和maxLines同时设置之后，可以不用给editor再设置高度
  // maxLines: 50, // 最大行数
});
function handleSave(){
  let verifyList = editor.value.getAceInstance().getSession().getAnnotations();
  let flag = true;
  for(let i=0;i<verifyList.length;i++){
    if(verifyList[i].type=='error'){
      ElMessage({
        type:"error",
        message:verifyList[i].text
      });
      flag = false;
      break;
    }
  };
  if(flag){
    ElMessage({
      type:"success",
      message:"完美！！！"
    })
  }
}
onMounted(()=>{
  
})
</script>

<style scoped lang="scss">
.vue-ace-editor {
  /* ace-editor默认没有高度，所以必须设置高度，或者同时设置最小行和最大行使编辑器的高度自动增高 */
  height: 300px;
  width: 100%;
  font-size: 16px;
  border: 1px solid;
}
.warning{
  font-size: 12px;
}
</style>