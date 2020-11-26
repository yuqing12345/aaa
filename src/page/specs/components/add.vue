<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="info.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格尺寸">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
          <div class="inpTop">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" @click="addAttr" v-if="index==0">新增规格属性</el-button>
            <el-button type="danger" @click="delAttr(index)" v-else>删除</el-button>
          </div>
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
import {
  reqSpecsAdd,
  reqSpecsOne,
  reqSpecsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr:[
        {value:''},
        {value:''}
      ],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      size: "specs/size",
      total: "specs/total",
    }),
  },
  methods: {
    ...mapActions({
      // 用于刷新specs列表
      reqManageList: "specs/reqChangeList",
      // 重新获取总条数
      reqChangeTotal: "specs/reqChangeTotal",
    }),
    // 点击新增按钮
    addAttr(){
      this.attrArr.push({value:''})
    },
    // 点击删除按钮
    delAttr(index){
      this.attrArr.splice(index,1)
    },
    close() {
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
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrArr = [
        {value:''},
        {value:''}
      ]
    },
    // 点击提交
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          // 弹窗
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqManageList();
          // 重新获取总条数
          this.reqChangeTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据信息
    getOne(id) {
      reqSpecsOne(id).then((res) => {
        this.form = res.data.list[0];
        // attrArr = [{value:''},{value:''}]
        this.attrArr = JSON.parse(this.form.attrs).map(item=>({value:item}))
        /* 
          item=>默认return
          item=>{}不会默认return，需要在{}外面return
          item=>({})      ()表示return   {}表示对象
        */
      });
    },
    // 修改
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      reqSpecsUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 关闭弹窗并重置数据
          this.cancel();
          // 刷新list列表
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
      this.reqManageList();
  },
};
</script>
<style scoped>
.inpTop {
  display: flex;
}
.inpTop button {
  width: 120px;
  flex: 1;
}
.inpBottom {
  display: flex;
}
.inpBottom button {
  width: 80px;
  flex: 1;
}
</style>
