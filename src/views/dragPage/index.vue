<template>
    <div class="drag_page">
      <div class="drag_zooe">
        <div class="drag_box" draggable="true" v-for="item in list">
          拖拽物{{ item }}
        </div>
      </div>
      <div class="drag_target">
        拖拽目标
      </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
let list = ["a","b","c","d"]

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
      });
  })
    dragZooe.addEventListener("dragenter",(e)=>{
      console.log("拖拽进入",e)
      
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
        console.log(1111)
        dragged.parentNode.removeChild(dragged);
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
  height: 100px;
  border: 1px solid #000;
}
.drag_box{
  width: 100px;
  height: 100px;
  background-color: red;
  display: inline-block;
  cursor: move;
}
.drag_target{
  min-width: 200px;
  height: 200px;
  background-color: #676795;

}
</style>