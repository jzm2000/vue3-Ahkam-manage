<template>
    <div class="drag_page">
      <div class="drag_zooe">
        <TransitionGroup name="list">
          <div class="drag_box" draggable="true" v-for="(item,index) in list" v-bind:['data-index']="index+1" :key="index">
            拖拽物{{ item }}
          </div>
        </TransitionGroup>
      </div>
      <div class="drag_target">
        拖拽目标
      </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
let list = ["1","2","3","4"]

onMounted(()=>{
  let dragBox = document.querySelectorAll(".drag_box");
  let dragTarget = document.querySelector(".drag_target");
  let dragZooe = document.querySelector(".drag_zooe");
  let dragged;
  Array.from(dragBox).forEach(item=>{
      item.addEventListener("drag",(event)=>{
        event.target.style.opacity = 0.5;
        event.target.style.cursor = "move"
      })
      item.addEventListener("dragstart",(e)=>{
        console.log("开始拖拽",e)
        dragged = e.target
         e.target.style.cursor = "move"
      });
      item.addEventListener("dragover",(e)=>{
        e.target.style.cursor = "move"
      })
      item.addEventListener("dragend",(e)=>{
        // console.log("拖拽结束",e)
        e.target.style.opacity = 1;
      
        e.target.style.cursor = "move"
      
      });
  })
  
  dragZooe.addEventListener("dragenter",(e)=>{
      // if(temp < targetIndex){
        if(e.target.classList.contains('drag_box')){
            console.log(e.target.offsetLeft,dragged.offsetLeft)
            console.log(e.target.offsetTop,dragged.offsetTop)
            // let temp = e.target.dataset.index;
            // let targetIndex = dragged.dataset.index;
            if(e.target.offsetLeft < dragged.offsetLeft){
              e.target.parentNode.insertBefore(dragged,e.target)
              // e.target.dataset.index = targetIndex;
              // dragged.dataset.index = temp;
            }else{
                e.target.parentNode.insertBefore(dragged,e.target.nextSibling)
              // e.target.dataset.index = targetIndex;
              // dragged.dataset.index = temp;
            }
            console.log("拖拽进入",e.target)
        }
  })
  dragZooe.addEventListener("dragleave",(e)=>{
    console.log("拖拽离开",e)
  })
  dragZooe.addEventListener("dragover",(e)=>{
    e.preventDefault()
  },false);
  dragZooe.addEventListener("drop",(e)=>{
    console.log("放置",e)
    if(e.target.classList.contains("drag_zooe")){
      dragged.parentNode.removeChild(dragged);
      console.log("放置了一个拖拽物",dragged)
      e.target.appendChild(dragged);
      dragged = ""
    }
  })
  
  dragTarget.addEventListener("dragover",(e)=>{
    e.preventDefault()
  },false);

  dragTarget.addEventListener("drop",(e)=>{
    console.log("放置后",e)
    if(e.target.classList.contains("drag_target")){
      dragged.parentNode.removeChild(dragged);
      e.target.appendChild(dragged);
      e.target.style.backgroundColor = "#676795"
      dragged = ""
    }
  })
  dragTarget.addEventListener("dragenter",(e)=>{
    console.log("进入目标",e)
    
    if(e.target.classList.contains('drag_box')){
        // let temp = e.target.dataset.index;
        // let targetIndex = dragged.dataset.index;
        if(e.target.offsetLeft < dragged.offsetLeft){
          e.target.parentNode.insertBefore(dragged,e.target)
          // e.target.dataset.index = targetIndex;
          // dragged.dataset.index = temp;
        }else{
            e.target.parentNode.insertBefore(dragged,e.target.nextSibling)
          // e.target.dataset.index = targetIndex;
          // dragged.dataset.index = temp;
        }
        console.log("拖拽进入",e.target)
    }
    if(e.target.classList.contains("drag_target")){
      e.target.style.backgroundColor = "green"
    }
  })
  dragTarget.addEventListener("dragleave",(e)=>{
    console.log("离开目标",e)
    if(e.target.classList.contains("drag_target")){
      e.target.style.backgroundColor = "#676795"
    }
  })
  
})

</script>

<style scoped lang="scss">
.drag_zooe{
  // width: 100px;
  min-height: 100px;
  border: 1px solid #000;
}
.drag_box{
  width: 100px;
  height: 100px;
  background-color: red;
  // display: inline-block;
  cursor: move;
  transition: all 0.5s;;
}
.drag_target{
  min-width: 200px;
  min-height: 200px;
  background-color: #676795;

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