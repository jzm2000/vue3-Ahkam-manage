<template>
  <div
    class="j-draggable"
    @mousedown="MouseDown"
    @mouseup="MouseUp"
    ref="dragger"
  >
    <template v-for="(item, index) in props.list" :key="index">
      <slot name="item" :item="item"></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["start", "end"]);
onMounted(() => {
  _init();
});
let draged;
function _init() {
  let dragger = document.querySelector(".j-draggable") as HTMLElement;
  dragger.addEventListener("dragenter", (e: DragEvent) => {
    const targetElement = e.target as HTMLElement;
    const parentNode = targetElement.parentNode;
    if (
      e.dataTransfer.types[0] !== "files" &&
      parentNode instanceof Element &&
      parentNode.classList.contains("j-draggable")
    ) {
      if (
        draged.offsetLeft > targetElement.offsetLeft ||
        draged.offsetTop > targetElement.offsetTop
      ) {
        dragger.insertBefore(draged, targetElement);
      } else {
        dragger.insertBefore(draged, targetElement.nextSibling);
      }
    } else {
      console.log("禁止进入");
    }
  });
  dragger.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });
  dragger.addEventListener("drop", (e) => {
    emit("end", e);
  });
  dragger.addEventListener("dragend", (e: Event) => {
    (e.target as HTMLElement).style.opacity = "1";
  });
  dragger.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}


function MouseDown(event) {
  if (event.target.parentNode.classList.contains("j-draggable")) {
    event.target.setAttribute("draggable", "true");
    event.target.addEventListener("dragstart", (e) => {
      e.dataTransfer.effectAllowed = "move";
      draged = e.target;
      e.target.style.opacity = "0.5";
      emit("start", e);
      // e.dataTransfer.setData("text", e.target.innerText);
    });
  }
}
function MouseUp(event) {
  if (event.target.parentNode.classList.contains("j-draggable")) {
    event.target.setAttribute("draggable", "false");
  }
}
</script>

<style scoped lang="scss"></style>
