<template>
  <div class="j-draggable" @mousedown="MouseDown" @mouseup="MouseUp" ref="dragger">
    <slot name="item"  v-for="(item,index) in props.list" :item="item" :key="index"></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  list:{
    type: Array,
    default: ()=>[]
  }
})
onMounted(() => {
  _init()
});
let draged;
function _init(){
  let dragger = document.querySelector(".j-draggable") as HTMLElement;
  
  dragger.addEventListener("dragstart",(e : Event)=>{
    console.log("开始拖拽");
  });
  dragger.addEventListener("dragenter",(e: Event)=>{
    const targetElement = e.target as HTMLElement
    const parentNode = targetElement.parentNode;
    if(parentNode instanceof Element && parentNode.classList.contains("j-draggable")){
      if(draged.offsetLeft > targetElement.offsetLeft || draged.offsetTop >targetElement.offsetTop){
        let dragedX = targetElement.getBoundingClientRect().left;
        let dragedY = targetElement.getBoundingClientRect().top;
        targetElement.style.offsetLeft = dragedX+'px';
        targetElement.style.offsetTop = dragedY+'px';
        draged.style.offsetLeft = dragedX + 'px';
        draged.style.offsetTop = dragedY + 'px';
        setTimeout(()=>{
          // dragger.insertBefore(draged,targetElement);
        },1000)
      }else{
        // dragger.insertBefore(draged,targetElement.nextSibling);
      }
    }
  });
  dragger.addEventListener("dragleave",(e)=>{
    // console.log("离开盒子",e);
  });
  dragger.addEventListener("drop",(e)=>{
    console.log("放置盒子",e);
  });
  dragger.addEventListener("dragend",(e)=>{
    console.log("结束拖拽");
  })
}

function MouseDown(event){
  if(event.target.parentNode.classList.contains("j-draggable")){
      event.target.setAttribute("draggable", "true");
    event.target.addEventListener("dragstart",(e)=>{
      draged = e.target;
      console.log("开始拖拽",e);
    });
    event.target.addEventListener("dragend",(e)=>{
        // console.log("结束",e);
    })
    event.target.addEventListener("dragover",(e)=>{
      e.preventDefault();
    })
    event.target.addEventListener("dragenter",(e)=>{
      // console.log("进入",e);
    })
    event.target.addEventListener("dragleave",(e)=>{
      // console.log("离开",e);
    })
    event.target.addEventListener("drop",(e)=>{
      // console.log("放置",e);
    })
    event.target.addEventListener("drag",(e)=>{
      // console.log("拖拽",e);
      e.target.style.cursor = "move";
    })
  }

}
function MouseUp(event){
  console.log(event);
  if(event.target.parentNode.classList.contains("j-draggable")){
      event.target.setAttribute("draggable", "false");
  }
}
</script>

<style scoped lang="scss"></style>