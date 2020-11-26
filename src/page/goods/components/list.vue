<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <div>
            {{scope.row.price | filterPrice}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="市场价格"
        sortable
        width="180"
      >
      <template slot-scope="scope">
        <div>
          {{scope.row.market_price | filterPrice}}
        </div>
      </template>
      </el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <div class="imgBox">
            <img :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.isnew == 1" type="primary">是</el-button>
            <el-button v-else type="info">否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rolename" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
            <el-button v-else type="info">否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @del2="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      size: "goods/size",
      total: "goods/total",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表数据
      reqChangeList: "goods/reqChangeList",
      // 总数量
      reqChangeTotal: "goods/reqChangeTotal",
      // 当前页数
      reqChangePage: "goods/reqChangePage",
    }),
    //新版删除
    del2(id) {
      reqGoodsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 重新刷新列表
          this.reqChangeList();
          // 重新获取当前总数量
          this.reqChangeTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了编辑按钮
    update(id) {
      // 去通知父级做某些事
      this.$emit("update", id);
    },
    // 修改了当前页码
    changePage(e) {
      this.reqChangePage(e);
    },
  },
  mounted() {
    if (this.goodsList.length == 0) {
      this.reqChangeList();
    }
    this.reqChangeTotal();
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>
