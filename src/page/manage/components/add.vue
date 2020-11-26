<template>
  <div>
    <el-dialog :title="info.isAdd?'添加管理员':'修改管理员'" :visible.sync="info.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级角色">
            <el-option label="请选择" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageAdd,reqManageOne,reqManageUpdate } from "../../../util/request";
import {successAlert,warningAlert} from "../../../util/alert"
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid:0,
        username:"",
        password:"",
        status:1
      },
    };
  },
  computed: {
    ...mapGetters({
      list:"role/list",
      size: "manage/size",
      total:"manage/total"
    }),
  },
  methods: {
    ...mapActions({
      // 用于所属角色的下拉栏
      reqChangeList:"role/reqChangeList",
      // 用于刷新manage列表
      reqManageList:"manage/reqChangeList",
      // 重新获取总条数
      reqChangeTotal:"manage/reqChangeTotal"
    }),
    close(){
      this.info.isShow = false;
      this.empty()
    },
    // 点击取消
    cancel() {
      this.info.isShow = false;
      this.empty()
    },
    // 作用：用来重置form数据
    empty() {
      this.form = {
        roleid:0,
        username:"",
        password:"",
        status:1
      };
    },
    // 点击提交
    add() {
      console.log(this.form)
      reqManageAdd(this.form).then(res=>{
        if(res.data.code === 200){
          // 弹窗
          successAlert(res.data.msg)
          // 取消弹窗并重置form数据
          this.cancel()
          // 刷新list列表
          this.reqManageList()
          // 重新获取总条数
          this.reqChangeTotal()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    /* 
      密码加密
      假设123加密后的结果是fudsiofvnldvn，对前5位进行二次加密fudsi：djsaoifidsfjdsvn
      前端密码输入123
      把123进行加密，然后取出前5位进行二次加密。djsaoifidsfjdsvn
      然后和数据库里面的密码进行对比，如果一样那么就说明密码匹配
    */
    // 获取一条数据信息
    getOne(uid){
      reqManageOne(uid).then(res=>{
        this.form = res.data.list
        this.form.roleid = res.data.list.roleid
        this.form.password = ''
      })
    },
    // 修改
    update(){
      reqManageUpdate(this.form).then(res=>{
        if(res.data.code === 200){
          successAlert(res.data.msg)
          // 关闭弹窗并重置数据
          this.cancel()
          // 刷新list列表
          this.reqManageList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    if(this.list.length===0){
      this.reqChangeList()
    }
  },
};
</script>
<style scoped>
</style>
