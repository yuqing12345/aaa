<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
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
          <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
          <del-btn @del2="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",
    }),
    //新版删除
    del2(id){
      reqRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 重新刷新列表
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了编辑按钮
    update(id){
      // 去通知父级做某些事
      this.$emit("update",id)
    }
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>
