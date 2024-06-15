<template>
  <el-input v-model="model" :type="props.componentContent.InputType" :prefixIcon="props.componentContent.prefixIcon"
    :placeholder="props.componentContent.placeholder" :suffixIcon="props.componentContent.suffixIcon"
    :maxlength="props.componentContent.maxLength" :minlength="props.componentContent.minLength"
    :show-word-limit="props.componentContent.showWordLimit" :clearable="props.componentContent.clearable"
    :show-password="props.componentContent.showPassword" :resize="props.componentContent.resize">
    <template #[props.componentContent.slotName]>
      {{ props.componentContent.slotContent }}
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { defineModel,defineProps } from "vue";
import type { PropsType } from "../../interface/component.ts"
const model = defineModel({ default: "" })
const props = defineProps<PropsType>();
</script>
 
<style scoped lang="scss"></style>