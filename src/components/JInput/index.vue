<template>
  <el-input v-model="model"/>
</template>

<script setup>
import { ref, toRefs, reactive, getCurrentInstance,defineComponent,defineProps,defineModel } from "vue";
const model = defineModel({default:""})
const props = defineProps({
  
});

</script>

<style scoped lang="scss"></style>