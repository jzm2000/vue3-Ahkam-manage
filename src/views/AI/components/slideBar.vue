<template>
  <div class="slide_bar">
    <div class="slide_application">
      <h1 class="head_slide">Spark4.0</h1>
      <hr />
      <div>
        <ul class="app_box">
          <li>
            <i class="iconfont icon-xinxi" style="font-size: 18px"></i>
            <p>对话</p>
          </li>
        </ul>
        <ul class="user_box">
          <li @click="openLogin">
            <i class="iconfont icon-yonghu" style="font-size: 24px"></i>
            <p>我的</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="slide_chat_info">
      <div class="cut_version">
        <el-select v-model="domain" placeholder="请选择" @change="selectModel">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div class="add_chat">
        <el-button icon="plus" style="width: 100%" plain @click="openChat"
          >新建对话</el-button
        >
      </div>
      <div class="chat_box">
        <div class="chat_search">
          <div v-if="isSelectAll">
            <el-button @click="selectDelAll">全选</el-button>
            <el-button @click="delSelectList">删除</el-button>
            <el-button @click="quitDel">退出</el-button>
          </div>
          <template v-else>
            <el-input
              v-model="recordKeyWod"
              style="width: 180px"
              placeholder="搜索历史记录"
              suffix-icon="Search"
              @keyup.enter="getList()"
            ></el-input>
            <el-icon class="del_btn" @click="isSelectAll = true"><Delete /></el-icon>
          </template>
        </div>
        <ul class="chat_list">
          <li
            v-for="(item, index) in titleList"
            :key="index"
            :class="{ actived: activedIndex === index }"
          >
            <template v-if="editIndex === index">
              <el-input
                v-model="item.title"
                placeholder="请输入标题"
                @blur="saveEdit(item)"
              >
                <template #append>
                  <el-icon @click="saveEdit(item)"><Check /></el-icon>
                </template>
              </el-input>
            </template>
            <template v-else>
              <el-checkbox :key="item.id" :value="item.id" v-show="isSelectAll" ref="checkbox" @change="handleCheck" true-value="1" false-value="0"></el-checkbox>
              <p class="ellipsis" @click="handleClick(item, index)">
                {{ item.title }}
              </p>
              <div class="operation_btn">
                <el-icon @click="openEdit(item,index)"><EditPen /></el-icon>
                <el-icon @click="handleDelete(item)"><Delete /></el-icon>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新建对话 -->
    <el-dialog
      title="新建对话"
      v-model="chatVisible"
      width="400"
      :close-on-click-modal="false"
      align-center
    >
      <el-form :model="chatForm" label-width="70px" @submit.prevent>
        <el-form-item label="对话标题">
          <el-input
            v-model="chatForm.title"
            type="text"
            placeholder="请输入对话"
            @keyup.enter="handleAdd"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="chatForm.type" placeholder="请选择类型">
            <el-option label="文本" :value="1"></el-option>
            <el-option label="图片" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div>
          <el-button @click="chatVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 登录/注册 -->
     <login v-model="visible"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Ref, Reactive } from "vue";
import { getTitleList, createTopic, deleteTopic, selectVersion,updateTopic } from "@/api/index.js";
const emit = defineEmits(["handleSelect"]);
import { ElMessage, ElMessageBox } from "element-plus";
import login from "@/components/login/index.vue"
import userStore from "@/stores/user.js";
const user = userStore();
type TitleList = {
  title: string;
  id: number;
  userId: number;
};
type chatInfoType = {
  id: number;
  userId: number;
};
const options = [{label:"Spark4.0 Ultra",value:"4.0Ultra"},{label:"Spark3.5 Max",value:"generalv3.5"},{label:"Spark Pro",value:"generalv3"},{label:"Spark Lite",value:"general"},{label:"Spark Pro-128k",value:"pro-128k"}]
const domain = ref("4.0Ultra");
const chatInfo: Reactive<chatInfoType> = reactive({
  id: null,
  userId: user.userInfo.id,
});
console.log(user.userInfo)
const chatVisible = ref(false);
const chatForm = reactive({
  userId: user.userInfo.id,
  title: "",
  type: 1,
});
let titleList: Ref<TitleList[]> = ref([]);
let recordKeyWod = ref("");
let editIndex = ref(-1);
let activedIndex = ref(-1);
let visible = ref(false);
let isSelectAll = ref(false);
let selectList = reactive([]);
let checkbox = ref([])
getList(true);
function getList(isSelect = false) {
  getTitleList({ userId: chatInfo.userId, title: recordKeyWod.value }).then(
    (res) => {
      if (res.code == 200) {
        titleList.value = res.record.rows;
        if (titleList.value.length > 0 && isSelect) {
          activedIndex.value = 0;
          emit("handleSelect", titleList.value[0]);
        }
      }
    },
  );
}
function openEdit(item: TitleList,index:number) {
  editIndex.value = index;
  console.log(item);
  console.log("编辑");
}
function handleDelete(item) {
  ElMessageBox.confirm("确定删除该对话吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteTopic({ id: item.id }).then((res) => {
        if (res.code == 200) {
          getList(true);
          ElMessage({
            type: "success",
            message: res.msg,
          });
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
        }
      });
    })
    .catch(() => {
      console.log("取消");
    });
}
function handleClick(item: TitleList, index: number) {
  activedIndex.value = index;
  emit("handleSelect", item);
}
function openChat() {
  chatVisible.value = true;
}
function handleAdd() {
  createTopic(chatForm).then((res) => {
    if (res.code == 200) {
      chatVisible.value = false;
      chatForm.title = "";
      chatForm.type = 1;
      getList(false);
      ElMessage({
        type: "success",
        message: res.msg,
      });
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
}
function openLogin(){
  visible.value = true;
}
function selectModel(){
  selectVersion({
    userId: chatInfo.userId,
    domain:domain.value
  }).then(res=>{
    console.log(res);
    if(res.code==200){
      ElMessage({
        type: "success",
        message: res.msg,
      });
    }else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  })
}
function saveEdit(item:TitleList){
  updateTopic({
    id:item.id,
    title:item.title,
  }).then(res=>{
    if(res.code==200){
      ElMessage({
        type: "success",
        message: res.msg,
      });
      editIndex.value = -1;
    }else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  })
}
function selectDelAll(){
  
}
function delSelectList(){}
function quitDel(){
  isSelectAll.value = false;
}
function handleCheck(e){
  checkbox.value.forEach(item=>{
    console.log(item.checked)
  })
}
</script>

<style scoped lang="scss">
.slide_bar {
  display: flex;
  height: 100%;
}
.slide_application {
  position: relative;
  width: 60px;
  border-right: 1px solid #b8b8b8;
  .head_slide {
    word-wrap: break-word;
    font-weight: bold;
    font-size: 14px;
    line-height: 60px;
  }
  .app_box {
    padding: 20px 12px;
    > li {
      cursor: pointer;
      text-align: center;
    }
  }
}
.slide_chat_info {
  width: 240px;
  padding: 60px 16px 0;
  background-color: #f8f8f8;
}
.user_box {
  position: absolute;
  bottom: 20px;
  padding: 20px 12px 0px 12px;
  > li {
    cursor: pointer;
    text-align: center;
  }
}
.add_chat {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.chat_box {
  margin-top: 24px;
}
.chat_search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .del_btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
    font-size: 16px;
    border-radius: 50%;
    &:hover {
      background-color: #e6dede;
    }
  }
}
.chat_list {
  color: #757596;
  font-size: 14px;
  padding: 20px 0;
  overflow: auto;
  height: calc(100vh - 188px);
  li {
    position: relative;

    cursor: pointer;
    border-radius: 14px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    &:hover {
      background-color: #e1e1e1;
    }
    p {
      padding: 5px 10px;
    }
  }
  .operation_btn {
    display: none;
    position: absolute;
    right: 12px;
    top: 5px;
    z-index: 9;
    i {
      margin-left: 8px;
      cursor: pointer;
      vertical-align: -10%;
      height: 20px;
      width: 20px;
      border-radius: 4px;
      &:hover {
        color: #0059c4;
        background-color: #ecf5ff;
      }
    }
  }
  li:hover .operation_btn {
    display: block;
    background-color: #e1e1e1;
  }
  .actived {
    display: block;
    background-color: #e1e1e1;
  }
}
</style>
