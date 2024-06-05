<template>
  <el-input v-model="model" :prefixIcon="props.componentContent.prefixIcon"
    :suffixIcon="props.componentContent.suffixIcon">
    <template #[props.componentContent.slotName]>
      {{ props.componentContent.slotContent }}
    </template>
  </el-input>
</template>

<script setup>
import { ref, toRefs, reactive, getCurrentInstance,defineComponent,defineModel,defineProps } from "vue";
const model = defineModel({default:""})

const props = defineProps({
    componentContent:{
        type:Object
    }
})
</script>

<style scoped lang="scss"></style>