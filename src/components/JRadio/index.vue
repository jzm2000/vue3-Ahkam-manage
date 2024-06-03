<template>
    <el-radio-group v-model="model">
        <el-radio :label="3">Option A</el-radio>
    </el-radio-group>
</template>

<script setup>
import {ref,reactive,defineModel} from "vue";
const model = defineModel({default:""});
</script>

<style scoped lang="scss"></style>