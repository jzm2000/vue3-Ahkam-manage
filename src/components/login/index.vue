<template>
    <el-dialog title="登录/注册" v-model="loginVisible" width="400px" :close-on-click-modal="false">
        <div class="login_register">
            <div class="login_register_form">
                <el-form :model="form" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password></el-input>
                    </el-form-item>
                    <div class="operation_btn">
                      <el-button type="primary" link>去注册</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <template #footer>
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
let loginVisible = ref(true)
let form = reactive({
    username: '',
    password: ''
})
function handleCancel() {
    loginVisible.value = false
}
function handleSave() {
    loginVisible.value = false
}
</script>

<style scoped lang="scss">
.operation_btn{
  text-align: right;
  margin-bottom: 12px;
}
</style>