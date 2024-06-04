<template>
  <el-input v-model="model"/>
</template>

<script setup>
import { ref, toRefs, reactive, getCurrentInstance,defineComponent,defineModel,defineProps } from "vue";
const model = defineModel({default:""})

const props = defineProps({
    componentContent:{
        type:Object
    }
})
console.log(props);
</script>

<style scoped lang="scss"></style>