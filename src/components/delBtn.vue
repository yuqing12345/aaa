<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>
<script>
export default {
  methods: {
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 子传父 通过自定义事件，通知父组件执行某些事
          this.$emit("del2")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
</style>