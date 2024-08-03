<template>
    <div>
      <j-draggable :list="list">
          <template #item="{item}" tag="div">
            <transition name="list">
              <div class="box">{{item.name}}</div>
            </transition>
          </template>
      </j-draggable>
    </div>
</template>

<script>
import JDraggable from "@/components/JDraggable/index.vue";
import { ref, reactive, getCurrentInstance,defineComponent,toRefs } from "vue";
export default defineComponent({
  components:{JDraggable},
  setup(props){
    const state = reactive({
      list:[{
        id:1,
        name:'111'
      },{
        id:2,
        name:'222'
      },{
        id:3,
        name:'333'
      },{
        id:4,
        name:'444'
      }]
    })
    return {
      ...toRefs(state)
    }
  }

})

</script>

<style scoped lang="scss">
.box{
  width: 100px;
  height: 100px;
  background-color: #ccc;
  margin: 10px;
  display: inline-block;
  transition: all 1s ease;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>