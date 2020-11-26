<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @del2="del2(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      page-size：每页显示的条数
      total：总数据条数
     -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total:"manage/total"
    }),
  },
  methods: {
    ...mapActions({
      // 列表
      reqChangeList: "manage/reqChangeList",
      // 总数量
      reqChangeTotal:"manage/reqChangeTotal",
      // 当前页数
      reqChangePage:"manage/reqChangePage"
    }),
    //新版删除
    del2(uid) {
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 重新请求列表
          this.reqChangeList();
          // 重新请求总条数
          this.reqChangeTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了编辑按钮
    update(uid) {
      // 去通知父级做某些事
      this.$emit("update", uid);
    },
    // 修改了当前页码
    changePage(e){
      this.reqChangePage(e)
    }
  },
  mounted() {
    // 请求列表数据
    this.reqChangeList();
    // 请求数据总条数
    this.reqChangeTotal()
  },
};
</script>
<style scoped>
</style>
