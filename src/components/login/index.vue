<template>
    <el-dialog title="" v-model="loginVisible" width="400px" :close-on-click-modal="false" @close="handleClose">
        <div class="login_register">
            <div class="login_register_form">
                <h2>{{ state == 1 ? '登录' : '注册'}}</h2>
                <el-form :model="form" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="验证码">
                        <div class="captcha_img">
                            <el-input v-model="form.verifyCode" style="width:180px;" placeholder="请输入验证码" type="text"></el-input>
                            <div class="svg_div" v-html="verifySvg" @click="getVerityCode"></div>
                        </div>
                    </el-form-item> -->
                    <div class="operation_btn">
                      <!-- <el-button type="primary" link>去注册</el-button> -->
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
import {getCaptcha} from "@/api"
import { ref, reactive,watch,defineOptions } from 'vue';
import { login } from "@/api/index.js"
import { encrypt } from "@/utils/base.js"
import { ElMessage } from "element-plus";
import userStore from "@/stores/user.js"
const store = userStore();
defineOptions({
    name: 'Login'
})
const prop = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits([
    'update:modelValue'
])
let loginVisible = ref(false);
let state = ref(1);
let form = reactive({
    username: 'jzm',
    password: '1234',
    // verifyCode:"" 
})
let verifySvg = ref('');
function handleCancel() {
    loginVisible.value = false;
    emit('update:modelValue', false)
}
function handleSave() {
    let param = JSON.parse(JSON.stringify(form));
 
    param.password = encrypt(param.password)
    store.loginAction(param).then(res=>{
        if(res.code == 200){
            ElMessage.success('登录成功')
            loginVisible.value = false;
            emit('update:modelValue', false)
        }else{
            ElMessage.error(res.msg)
        }
    }).catch(err=>{
        console.log(err)
    })
    // form.verifyCode = ''
}  
function getVerityCode(){
    getCaptcha().then(res=>{
        verifySvg.value = res.data
    })
}
function handleClose(){
    emit('update:modelValue', false)
}
watch(()=>prop.modelValue,(val)=>{
    loginVisible.value = val
    if(val){
        // getVerityCode();
    }
},{immediate:true,deep:true})

</script>

<style scoped lang="scss">
.operation_btn{
  text-align: right;
  margin-bottom: 12px;
}
.login_register_form{
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
}
.captcha_img{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .svg_div{
        cursor: pointer;
        height: 35px;;
    }
    :deep(svg){
        height: 35px;
        width: 120px;
    }
}
</style>