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
                <el-main>
                    
                </el-main>
                <el-aside width="250px">
                    <Panel></Panel>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import ASide from "./components/ASide/index.vue"
import Header from "./components/Header/index.vue"
import Panel from "./components/Panel/index.vue"
import { defineComponent } from "vue"
export default defineComponent({
    components:{
        Header,
        ASide,
        Panel
    },
    setup(){
        return {
            
        }
    }
})
</script>
<style lang="scss" scoped>
    .el-main{
        height: calc(100vh - 60px);
        background-color: #f1f2f3;
    }
</style>