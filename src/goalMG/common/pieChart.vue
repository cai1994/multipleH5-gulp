<template>
  <div>
    <!-- <p class="title">总业绩分布情况</p> -->
    <div class="pieChart" style="margin: 0 auto;" :id="idindex"></div>
  </div>
</template>
<script>
//引入主模块
import echarts from "echarts/lib/echarts";
// // 引入饼图
require("echarts/lib/chart/pie");
// // 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import stringUil from "@common/js/util/stringUtil.js";
export default {
  props: {
    echartData: {
      type: Array
    },
    idindex: {
      type: String,
      dafault: "pieChart"
    }
  },
  watch: {
    echartData(newValue) {
      for (let key in newValue) {
      if (newValue.hasOwnProperty(key)) {
        if (newValue[key].value != 0&&newValue[key].value) {
          newValue[key].value = this.divide(newValue[key].value, 10000);
        }else{
          newValue[key].value=0
        }
      }
    }
      this.getCharts(newValue);
    }
  },
  methods: {
    getCharts(dataArr) {
      this.$nextTick(() => {
        //设置style宽度 长度 不然echarts无法获取，
        //还是不知道问什么一定要获取style的高和宽，感觉好傻比
        $("#" + this.idindex).height("12rem");
        $("#" + this.idindex).width("90vw");
        // 基于准备好的dom，初始化echarts实
        // $(document.getElementById(this.idindex)).empty();
        let myChart = echarts.init(document.getElementById(this.idindex));
        let option = {
          title:{
            text:"(单位/万元)",
            textStyle:{
                fontSize:14
            }
          },
          series: [
            {
              type: "pie",
              radius: [0, "60%"],
              name: "总业绩分布",
              center: ["50%", "60%"],
              label: {
                normal: {
                  show: true,
                  formatter: "{b} \n ￥{c}",
                  color: "#394259"
                }
              },
              data: dataArr
            }
          ]
        };
        myChart.setOption(option, true);
      });
    },
    divide(arg1, arg2) {
			let t1 = 0,
				t2 = 0,
				r1,
				r2;
			try {
				t1 = arg1.toString().split(".")[1].length;
			} catch (e) {}
			try {
				t2 = arg2.toString().split(".")[1].length;
			} catch (e) {}
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 /(r2*Math.pow(10, t1-t2)));
		},
  },
  mounted() {
    for (let key in this.echartData) {
      if (this.echartData.hasOwnProperty(key)) {
        if (this.echartData[key].value != 0) {
          this.echartData[key].value = this.divide(this.echartData[key].value, 10000);
        }
      }
    }
    //将数据转换key为 name和value的数组
    this.getCharts(this.echartData);
  }
};
</script>
<style lang="less" scoped>
// .title {
//   color: #333;
//   font-size: 0.9rem;
//   font-weight: bold;
//   margin-left: 5vw;
//   padding-left: 0.8rem;
//   position: relative;
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0.3rem;
//     left: 0;
//     display: inline-block;
//     width: 0.2rem;
//     height: 0.8rem;
//     background-color: @cor-ff6b00;
//   }
// }
</style>

