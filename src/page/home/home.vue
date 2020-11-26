<template>
  <div>
    <!-- 容器 -->
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("box"));
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "line",
              data: this.list.map((item) => item.children.length),
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqChangeList",
    }),
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
#box {
  width: 80%;
  height: 400px;
  border: 1px solid red;
}
</style>