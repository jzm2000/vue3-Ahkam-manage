<template>
    <el-collapse v-model="activeName" @change="handleChange" class="form_template">
        <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in list">
            <draggable :list="item.componentList" :group="groupA" animation="300" :clone="handleClone" :sort="false"
                item-key="id" v-if="item.componentList.length">
                <template #item="{ element,index }">
                    <span class="drag_li">{{ element.name }}</span>
                </template>
            </draggable>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance,defineComponent } from "vue";
import componentData from "@/views/panelComponent/componentData.ts";
import draggable from "vuedraggable"
let activeName = ref([0]);
const groupA = reactive({ name: "startBox", pull: "clone", put: true });
function handleChange(val){
    console.log(activeName.value);
}
function handleClone(row){
    console.log(row);
    return row
}
const list = ref(componentData);
</script>

<style scoped lang="scss">
.form_template {
    :deep(.el-collapse-item__header) {
        font-weight: bold;
    }
}
.drag_li {
    float: left;
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #e8e9ebab;
    margin-bottom: 10px;
    cursor: move;
    user-select: none;
    margin-left: 12px;
    &:hover {
        background-color: #F2F2F1;
    }
}
</style>