<template>
  <el-dialog v-model="model">
    <el-form :model="formSetting" ref="formRef" :rules="rules" label-width="82" label-position="right" size="default"
      :disabled="false">

      <el-form-item label="姓名：" prop="name" label-width="">
        <el-input type="text" v-model="formSetting.name" prefixIcon="Search" placeholder="请输入姓名" :maxlength="10"
          :show-word-limit="true" :clearable="true" resize="horizontal">

        </el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone" label-width="">
        <el-input type="text" v-model="formSetting.phone" placeholder="请输入手机号" :maxlength="11" :show-word-limit="true"
          :clearable="true" resize="horizontal">
          <template #prepend>
            {{ +86 }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="学历：" prop="education" label-width="">
        <el-select v-model="formSetting.education" :multiple="true" :clearable="true" :collapse-tags="true"
          :multiple-limit="3" effect="light" :filterable="true" :collapse-tags-tooltip="true" placeholder="请选择">
          <el-option label="小学" value="1"></el-option>
          <el-option label="初中" value="2"></el-option>
          <el-option label="高中" value="3"></el-option>
          <el-option label="大学" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" prop="age" label-width="">
        <el-radio-group v-model="formSetting.age" size="default" text-color="#ffffff" fill="#409EFF">
          <el-radio-button label="男" value="1"></el-radio-button>
          <el-radio-button label="女" value="2"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好：" prop="like" label-width="">
        <el-checkbox-group v-model="formSetting.like" :max="2" size="default">
          <el-checkbox label="足球" value="1" :border="true"></el-checkbox>
          <el-checkbox label="篮球" value="2" :border="true"></el-checkbox>
          <el-checkbox label="乒乓球" value="3" :border="true"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="个人简介：" prop="Info" label-width="">
        <el-input type="textarea" v-model="formSetting.Info" placeholder="请输入个人简介" :maxlength="100"
          :show-word-limit="true" :clearable="true" resize="none">
        </el-input>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit">校验</el-button>
  </el-dialog>
</template>
<script setup>
import { reactive,defineModel,ref } from "vue"
let model = defineModel()
const formSetting = reactive({
  name: '',
  phone: '',
  education: [],
  age: '',
  like: [],
  Info: '',

})
let formRef = ref();
const phoneRule = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入手机号"))
  }
  if (!/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(value)) {
    return callback(new Error("请输入正确格式的手机号！"));
  }
  callback();
}



const rules = {
  name: { required: true, message: "请输入姓名", trigger: "blur" },
  phone: { required: true, trigger: "blur", validator: phoneRule },
  education: { required: true, message: "请选择学历", trigger: "blur" },
  age: { required: true, message: "请选择性别", trigger: "blur" },
  like: { required: true, message: "请选择爱好", trigger: "blur" },
  Info: { required: false, message: "", trigger: "blur" },

}

function handleSubmit(){
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped></style>