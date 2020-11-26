<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品分类' : '修改商品分类'"
      :visible.sync="info.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 这里需要再次改变 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 原生 -->
        <!-- <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl">
            <input type="file" @change="changeFile" v-if="info.isShow">
          </div>
        </el-form-item> -->
        <!-- element-ui -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false" :on-change="changeFile2">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { reqCateAdd, reqCateOne, reqCateUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    // 改变了图片
    changeFile(e) {
      console.log(e)
      let file = e.target.files[0];
      // 限制大小file.size      限制大小为2M     B-->1024KB   1024KB-->1M
      if(file.size > 2*1024*1024){
        warningAlert("图片大小超出限制")
        return
      }
      // URL.createObjectURL   可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    changeFile2(e){
      let file = e.raw
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file
    },
    // 点击叉号
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
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    // 点击提交
    add() {
      reqCateAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          // 弹窗
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据信息
    getOne(id) {
      reqCateOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + res.data.list.img;
      });
    },
    // 修改
    update() {
      reqCateUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 关闭弹窗并重置数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
.fileBox {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.fileBox input {
  width: 150px;
  height: 150px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.fileBox h3 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
}
.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}

/* element-ui */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
