<template>
  <el-dialog
    title="测试页面"
    v-model="model"
    width="500px"
    :close-on-click-modal="false"
  >
    <span>
      <el-form
        :model="formSetting"
        ref="formRef"
        :rules="rules"
        label-width="80"
        label-position="left"
        size="default"
        :disabled="false"
      >
        <el-form-item label="姓名" prop="userName" label-width="">
          <el-input
            v-model="formSetting.userName"
            type="text"
            placeholder="请输入姓名"
            size=""
            :disabled="false"
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phone" label-width="">
          <el-input
            v-model="formSetting.phone"
            type="text"
            placeholder="请输入手机号"
            size=""
            :disabled="false"
          />
        </el-form-item>

        <el-form-item label="性别" prop="sex" label-width="">
          <el-radio-group v-model="formSetting.sex" :disabled="false">
            <el-radio label="男" value="1"></el-radio
            ><el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="在职情况" prop="jobState" label-width="">
          <el-select
            v-model="formSetting.jobState"
            :disabled="false"
            placeholder="请选择"
          >
            <el-option label="在职" value="1"></el-option
            ><el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="兴趣爱好" prop="interest" label-width="">
          <el-checkbox-group v-model="formSetting.interest" :disabled="false">
            <el-checkbox label="乒乓球" value="1"></el-checkbox
            ><el-checkbox label="足球" value="2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="个人简介" prop="userInfo" label-width="">
          <el-input
            v-model="formSetting.userInfo"
            type="textarea"
            placeholder="请输入"
            size=""
            :disabled="false"
          />
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer">
      <el-button @click="model = false">Cancel</el-button>
      <el-button type="primary" @click="model = false">OK</el-button>
    </span>
  </el-dialog>
</template>
<script setup>
import { reactive, defineModel } from "vue";
const model = defineModel();
const formSetting = reactive({
  userName: "",
  phone: "",
  sex: "",
  jobState: "",
  interest: [],
  userInfo: "",
});
const rules = {};
</script>
<style lang="scss" scoped></style>
