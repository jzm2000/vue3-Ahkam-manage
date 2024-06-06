<template>
  <el-input v-model="model" :prefixIcon="props.componentContent.prefixIcon" :placeholder="props.componentContent.placeholder"
    :suffixIcon="props.componentContent.suffixIcon" :maxlength="props.componentContent.maxLength"
    :minlength="props.componentContent.minLength" :show-word-limit="props.componentContent.showWordLimit"
    :clearable="props.componentContent.clearable" :show-password="props.componentContent.showPassword" :resize="props.componentContent.resize">
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