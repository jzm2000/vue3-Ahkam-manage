<template>
  <div class="header">
    <div class="aside_header"></div>
    <div class="operation_btns">
      <div class="left_device"></div>
      <div class="right_function">
        <el-button type="primary">清空组件</el-button>
        <el-button>预览</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </div>
    </div>
    <div class="panel_header"></div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped lang="scss">
.header{
  display: flex;
  align-items: center;
  height: 100%;
  .aside_header{
    width: 250px;
  }
  .panel_header{
    width:280px;
  }
  .operation_btns {
    text-align: right;
    padding: 10px;
    flex: 1 auto;
  }
}

</style>