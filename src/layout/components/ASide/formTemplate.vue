<template>
    <el-collapse v-model="activeName" @change="handleChange" class="form_template">
        <draggable :list="list" :group="groupA" animation="300" :clone="handleClone" :sort="false" item-key="id">
            <el-collapse-item :title="item.title" name="1" v-for="item in list">
                <template #item="{ element }">
                    <!-- <ul class="component_list">
                        <li v-for="e in items.componentList">{{ e.name }}</li>
                    </ul> -->
                    <div>{{ element }}</div>
                </template>
            </el-collapse-item>
        </draggable>

    </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance,defineComponent } from "vue";
import componentData from "@/views/panelComponent/componentData.ts";
import draggable from "vuedraggable"
let activeName = ref<String>("");
const groupA = reactive({ name: "startBox", pull: "clone", put: true });
function handleChange(val){
    console.log(val);
}
function handleClone(row){
    console.log(row);
}
const list = ref(componentData);
</script>

<style scoped lang="scss">
.form_template {
    :deep(.el-collapse-item__header) {
        font-weight: bold;
    }
}

.component_list {
    &::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }

    >li {
        float: left;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #e8e9ebab;
        margin-bottom: 10px;
        cursor: move;
        user-select: none;

        &:hover {
            background-color: #F2F2F1;
        }
    }

    >li:nth-child(2n) {
        margin-left: 10px;
    }
}
</style>