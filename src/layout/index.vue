<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <ASide></ASide>
                </el-aside>
                <!-- 主屏 -->
                <el-main>
                    <div class="form-container_main">
                        <el-scrollbar>
                            <el-form :model="formSetting" :label-width="AppData.labelWidth" class="form_class"
                                :label-position="AppData.labelPosition" :size="AppData.size">
                                <draggable :list="AppData.AppList" :group="groupB" animation="300"
                                    class="draggable_content" item-key="id" @change="handleMove">
                                    <template #item="{ element:{componentContent,uid,type} }">
                                        <div class="page_list-item" @click="selectComponent(uid,componentContent,type)">
                                            <el-form-item :label="componentContent.label"
                                                :label-width="componentContent.labelWidth">
                                                <component :is="type"
                                                    :type="type=='JInput' ? componentContent.InputType : ''"
                                                    :placeholder="componentContent.placeholder"
                                                    :size="componentContent.size"
                                                    v-model="componentContent.defaultValue"></component>
                                            </el-form-item>
                                        </div>
                                    </template>

                                </draggable>
                            </el-form>
                        </el-scrollbar>
                    </div>
                </el-main>
                <el-aside width="280px">
                    <Panel></Panel>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import draggable from "vuedraggable"
import ASide from "./components/ASide/index.vue"
import Header from "./components/Header/index.vue"
import Panel from "./components/Panel/index.vue"
import { defineComponent, reactive,ref } from "vue"
import { storeToRefs } from "pinia"
import useAppStore from "@/stores/app.ts"
import JInput from "@/components/JInput/index.vue";
import componentData from "@/views/panelComponent/componentData.ts";
export default defineComponent({
    components: {
        Header,
        ASide,
        Panel,
        draggable,
        JInput
    },
    setup() {
        const appStore = useAppStore();
        const groupB = reactive({ name: "startBox", pull: false });
        const formSetting = reactive({

        });
        let id = ref(0);
        function handleMove(val) {
           
        }
        function selectComponent(uid, componentContent, type){
            id.value = uid;
            appStore.setCurrentComponent(uid);
        }
        const { AppData } = storeToRefs(appStore)
        console.log("AppData",AppData);
        return {
            AppData,
            groupB,
            formSetting,
            id,
            handleMove,
            selectComponent
        }
    }
})
</script>
<style lang="scss" scoped>
.page_list-item{
    outline:1px solid transparent;
    margin: 1px;
    &:hover{
        outline-color: #409EFF;
        outline-style: dotted
    }
    .actived{
        outline-color:#409EFF;
        outline-style: solid;
    }
}
.form_class{
    padding-right: 10px;
}
.el-main {
    // height: calc(100vh - 30px);
    background-color: #f1f2f3;
    padding: 10px;
}
.form-container_main{
    min-height: calc(100vh - 80px);
    background-color: #fff;
    padding:10px;
}
.draggable_content{
    height: calc(100vh - 101px);
}
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