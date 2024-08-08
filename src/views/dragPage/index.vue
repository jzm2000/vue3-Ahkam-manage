<template>
  <div>
    <j-draggable :list="list" @end="end">
      <template #item="{ item }" tag="div">
        <transition name="list">
          <div class="box">{{ item.name }}</div>
        </transition>
      </template>
    </j-draggable>

    <div class="box_upload"></div>
  </div>
</template>

<script>
import JDraggable from "@/components/JDraggable/index.vue";
import {
  ref,
  reactive,
  getCurrentInstance,
  defineComponent,
  toRefs,
  onMounted,
} from "vue";
import { getEncrypt } from "@/utils/ras.js"
export default defineComponent({
  components: { JDraggable },
  setup(props) {
    const state = reactive({
      list: [
        {
          id: 1,
          name: "111",
        },
        {
          id: 2,
          name: "222",
        },
        {
          id: 3,
          name: "333",
        },
        {
          id: 4,
          name: "444",
        },
        {
          id: 5,
          name: "555",
        },
      ],
    });
    const methods = {
       end(obj){
        console.log(obj);
      }
    }

    onMounted(() => {
      let boxUpload = document.querySelector(".box_upload");
      boxUpload.addEventListener("dragstart", (e) => {});
      boxUpload.addEventListener("dragenter", (e) => {
        console.log("经过",e);
        e.target.style.borderColor = "#f69c5d";
        e.target.style.backgroundColor = "#f69c5d";
      });
      boxUpload.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      boxUpload.addEventListener("dragleave", (e) => {
          console.log('离开',e);
        e.target.style.borderColor = "#ccc";
        e.target.style.backgroundColor = "";
      });
      boxUpload.addEventListener("drop", (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files[0]);
        let file = new FileReader();
        file.readAsDataURL(files[0]);
        file.onload = (e) => {};
      });
    });

    return {
      ...toRefs(state),
      ...methods
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  margin: 10px;
  display: inline-block;
  transition: all 0.3s ease;
}
.box_upload {
  height: 200px;
  width: 200px;
  border: 1px solid #ccc;
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
