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
                    <div class="form-container_main" :class="{'form-container_H5':deviceType==2}">
                        <el-scrollbar>
                            <el-form :model="formSetting" :label-width="AppData.labelWidth" class="form_class"
                                :label-position="AppData.labelPosition" :size="AppData.size">
                                <draggable :list="AppData.AppList" :group="groupB" animation="300" handle=".move"
                                    @add="handleAdd" class="draggable_content" item-key="uid" @end="handleMove">
                                    <template #item="{ element:{componentContent,uid,type,name},index }">
                                        <div class="page_list-item"
                                            @click.stop="selectComponent(uid,componentContent,type)"
                                            :class="{actived:id==uid}">
                                            <el-form-item :label="componentContent.label"
                                                :required="componentContent.isRequired"
                                                :label-width="componentContent.labelWidth" :key="uid">
                                                <component :is="type" :key="uid" :size="componentContent.size"
                                                    :componentContent="componentContent"
                                                    :disabled="componentContent.disabled"
                                                    v-model="componentContent.defaultValue" class="component_style">
                                                </component>
                                                <div class="operation_btn" v-show="id===uid">
                                                    <el-icon @click.stop="handleDelete(index)">
                                                        <Delete />
                                                    </el-icon>
                                                </div>
                                            </el-form-item>
                                            <div class="move_area move" v-show="id===uid">
                                                <el-icon>
                                                    <Rank />
                                                </el-icon>{{ name }}
                                            </div>
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
<script lang="ts">
import draggable from "vuedraggable"
import ASide from "./components/ASide/index.vue"
import Header from "./components/Header/index.vue"
import Panel from "./components/Panel/index.vue"
import { defineComponent, reactive,ref,computed } from "vue"
import { storeToRefs } from "pinia"
import useAppStore from "@/stores/app.ts"
// import JInput from "@/components/JInput/index.vue";
import componentData from "@/views/panelComponent/componentData.ts";
interface GroupType {
    name:String;
    pull:boolean;
    put:boolean;
}
export default defineComponent({
    components: {
        Header,
        ASide,
        Panel,
        draggable,
    },
    setup() {
        const appStore = useAppStore();
        let deviceType = computed(()=>{
            return appStore.deviceType
        })
        const groupB:GroupType = reactive({ name: "startBox", pull: false,put:true });
        const formSetting = reactive({

        });
        let id = ref(0);
        function handleMove(val) {
           console.log("move",val);
        }
        function selectComponent(uid, componentContent, type){
            id.value = uid;
            appStore.setCurrentComponent(uid);
        }
        function handleAdd(val){
            console.log('add',val);
        }
        function handleDelete(index){
            appStore.delCurrentComponent(index).then(uid=>{
                this.selectComponent(uid);
            }).catch(e=>{})
        }
        const { AppData } = storeToRefs(appStore)
        return {
            AppData,
            groupB,
            formSetting,
            id,
            deviceType,
            handleMove,
            handleAdd,
            selectComponent,
            handleDelete
        }
    }
})
</script>
<style lang="scss" scoped>
.page_list-item{
    position:relative;
    outline:1px solid transparent;
    margin: 1px;
    &:hover{
        outline-color: #409EFF;
        outline-style: dotted
    }
    .move_area{
        position:absolute;
        top:0;
        left:0;
        background-color: #409EFF;
        color:#fff;
        font-size:12px;
        padding:2px 10px;
        cursor:move!important;
        opacity:0.6;
        &:hover{
            opacity:1;
        }
    }
    .operation_btn{
        display:block;
        flex-basis: 30px;
        text-align: center;
        z-index: 99;
        background-color: #409EFF;
        font-size: 18px;
        i{
            cursor: pointer;
            color: #fff;
        }
    }
    :deep(.component_style){
        flex: 1 !important;
    }
    
}
.page_list-item.actived{
    outline-color:#409EFF;
    outline-style: solid;
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
.form-container_H5{
    width: 420px;
    border-radius: 15px;
    margin: 0 auto;
    box-shadow: 0px 0px 1px 10px #444b5a;
}
.draggable_content{
    height: calc(100vh - 101px);
}
.form_template {
    :deep(.el-collapse-item__header) {
        font-weight: bold;
    }
}
.el-header{
    padding:0;
}
.drag_li {
    float: left;
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #e8e9ebab;
    margin-bottom: 10px;
    user-select: none;
    margin-left: 12px;

    &:hover {
        background-color: #F2F2F1;
    }
}
.move{
    cursor:move;
}
</style>