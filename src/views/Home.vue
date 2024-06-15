<template>
  <div>
    <el-button @click="handleClick">发送事件</el-button>
    <el-button @click="handleOff">解除事件</el-button>
    <el-button @click="handleBind">重新绑定</el-button>
  </div>
</template>

<script>
import { EventBus,$bus } from "@/utils/EventBus.js"
import { ref, reactive,defineComponent } from "vue";
export default defineComponent({
  setup(){
    $bus.on("greet", func)
    function func(arg){
      console.log(arg);
    }
    function handleClick(){
      $bus.emit("greet", "word");
      console.log($bus);
    }
    function handleOff(){
      $bus.remove("greet");
      $bus.emit("greet", "word");
    }
    function handleBind(){
      $bus.on("greet", func)
    }
    return {
      handleClick,
      handleOff,
      handleBind
    }
  }
})

</script>

<style scoped lang="scss"></style>