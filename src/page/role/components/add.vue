<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="info.isShow" @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色管理">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "../../../router/index";
import { reqRoleAdd, reqRoleOne, reqRoleUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "menu/reqChangeList",
      reqRoleChangeList: "role/reqChangeList",
    }),
    close(){
      this.info.isShow = false;
      this.empty();
    },
    // 点击取消
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    // 作用：用来重置form数据
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 点击提交
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          // 弹窗
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqRoleChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据信息
    getOne(id) {
      reqRoleOne(id).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        // 设置树形控件
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
      });
    },
    // 修改
    update() {
      // 点击修改form的其他数据是加上了，但是menus需要重新设置一下
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 关闭弹窗并重置数据
          this.cancel();
          // 刷新RoleList列表
          this.reqRoleChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 为什么需要请求menuList。因为list没有数据
    if (this.list.length === 0) {
      this.reqChangeList();
    }
  },
};
</script>
<style scoped>
</style>
