<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="info.isShow"
      @close="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeFile" v-if="info.isShow" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsArr"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="div1">

          </div>
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
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsOne,
  reqGoodsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
// 引入富文本
import E from "wangeditor"
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
      // 用于渲染图片
      imgUrl: "",
      // 用于渲染规格属性
      specsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类
      cateList: "cate/list",
      // 商品规格
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      // 一级分类的action
      reqFirstList: "cate/reqChangeList",
      // 商品规格的action
      reqSpecs: "specs/reqChangeList",
      // 请求列表数据
      reqChangeList: "goods/reqChangeList",
      // 总数量
      reqChangeTotal: "goods/reqChangeTotal",
    }),
    // 当打开动画完成时
    opened(){
      // 加载富文本
      this.editor = new E('#div1')
      this.editor.create()

      // 设置富文本的内容
      this.editor.txt.html(this.form.description)
    },
    // 改变了一级分类
    changeFirst() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        // 清空form里面的second_cateid
        this.form.second_cateid = "";
        // 用于渲染二级分类
        this.secondArr = res.data.list;
      });
    },
    // 改变了图片
    changeFile(e) {
      console.log(e);
      let file = e.target.files[0];
      // 限制大小file.size      限制大小为2M     B-->1024KB   1024KB-->1M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      // URL.createObjectURL   可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 改变了商品规格
    changeSpecs() {
      // 清空规格属性
      this.specsArr = [];
      this.form.specsattr = [];

      // 找到specsList里面id是我需要的那一条数据
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      // 把那一条数据的attrs赋值给我的specsArr
      this.specsArr = obj.attrs;
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
      (this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        (this.secondArr = []);
      this.imgUrl = "";
      this.specsArr = [];
    },
    // 点击提交
    add() {
      // 第一种
      // this.form.specsattr = JSON.stringify(this.form.specsattr)
      // 第二种
      // let data = this.form
      // data.specsattr = JSON.stringify(this.form.specsattr)

      // 将富文本的内容加入到form中
      this.form.description = this.editor.txt.html()
      // 第三种
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      
      reqGoodsAdd(data).then((res) => {
        if (res.data.code === 200) {
          // 弹窗
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList()
          // 刷新列表总数
          this.reqChangeTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据信息
    getOne(id) {
      reqGoodsOne(id).then((res) => {
        this.form = res.data.list;
        // 补充id，因为修改的时候需要id
        this.form.id = id
        // 1、根据一级分类的id获取二级分类的列表
        reqCateList({ pid: this.form.first_cateid }).then((res) => {
          // 用于渲染二级分类
          this.secondArr = res.data.list;
        });
        // 2、处理图片
        this.imgUrl = this.$imgUrl + this.form.img
        // 3、处理规格属性 
        this.form.specsattr = JSON.parse(this.form.specsattr)
        // 4、处理规格属性的下拉框
        let obj = this.specsList.find((item) => item.id == this.form.specsid);
        this.specsArr = obj.attrs;
      });
    },
    // 修改
    update() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };

      reqGoodsUpdate(data).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 关闭弹窗并重置数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqFirstList();
    }
    if (this.specsList.length === 0) {
      // 因为specs数据需要分页的，而goods请求商品规格是不需要分页的。那么我们在调用接口之前传一个值，这个值的作用是判断是否需要分页
      this.reqSpecs(true);
    }

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
</style>
