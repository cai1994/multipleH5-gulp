<template>
	<div class="echartsBar">
		<p class="title">每月总业绩对比</p>
		<div htmdEvt="myPERF_yearsPERF_detailPERF" id="barChart"></div>
	</div>
</template>
<script>
//引入主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import stringUil from "@common/js/util/stringUtil.js";
export default {
	data() {
		return {};
	},
	props: ["selectYear", "echartMonth", "echartData", "type"],
	methods: {
		getCharts(month, data) {
			let charts = echarts.init(document.getElementById("barChart"));
			charts.setOption({
				xAxis: {
					data: month,
					triggerEvent: true,
					axisLabel: {
						interval: 0,
						rotate: 40,
						color: "#858d9d"
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: "#edeff3"
						}
					}
				},
				yAxis: {
					show: true,
					name: "(单位/万元)",
					splitLine: {
						color: ["#aaa", "#ddd"]
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					axisLabel: {
						showMinLabel: false,
						inside: true,
						fontSize: 10,
						align: "center",
						color: "#858d9d"
					},
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: "#edeff3"
						}
					},
					z: 0
				},
				series: [
					{
						name: "销量",
						type: "bar",
						data: data,
						barGap: 0,
						label: {
							normal: {
								align: "center",
								show: true,
								distance: 10,
								rotate: 40,
								offset: [20, -15],
								position: "top",
								color: "#858d9d",
								fontSize: 10,
								formatter: "￥{c}",
								z: 200
							}
						},
						barWidth: 16,
						itemStyle: {
							normal: {
								color: "#ff6b00",
								opacity: 0.8
							}
						}
					}
				]
			});

			charts.on("click", params => {
				if (params.componentType == "xAxis") {
					let str = params.value;
					str = parseInt(str) >= 10 ? parseInt(str) : "0" + parseInt(str);
					
					let url = "";
					url =
						this.type == "personal"
							? `${goUrl.detailPERF}?year=${this.selectYear}&month=${str}`
							: `${goUrl.teamMonthPERF}?year=${
									this.selectYear
							  }&month=${str}&orgType=${splitUrl().orgType}&orgCode=${
									splitUrl().orgCode
							  }`;
					window.location.href = url;
				} else {
					let mothDate =
						parseInt(params.dataIndex + 1) > 9
							? parseInt(params.dataIndex + 1)
							: "0" + parseInt(params.dataIndex + 1);
					let url = "";
					url =
						this.type == "personal"
							? `${goUrl.detailPERF}?year=${this.selectYear}&month=${mothDate}`
							: `${goUrl.teamMonthPERF}?year=${
									this.selectYear
							  }&month=${mothDate}&orgType=${splitUrl().orgType}&orgCode=${
									splitUrl().orgCode
							  }`;
					window.location.href = url;
				}
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
			return r1 / (r2 * Math.pow(10, t1 - t2));
		}
	},
	mounted() {
		for (const key in this.echartData) {
			if (this.echartData.hasOwnProperty(key)) {
				if (this.echartData[key] != 0&&this.echartData[key]) {
					this.echartData[key] = this.divide(this.echartData[key], 10000);
				}else{
					this.echartData[key]=0
				}
			}
		}
		this.getCharts(this.echartMonth, this.echartData);
	}
};
</script>
<style lang="less" scoped>
@import "~@common/less/color.less";
.echartsBar {
	position: relative;
	.title {
		color: #333;
		font-size: 0.85rem;
		font-weight: bold;
		margin-left: 5vw;
		padding-left: 0.8rem;
		position: relative;
		&::before {
			content: "";
			position: absolute;
			top: 0.2rem;
			left: 0;
			display: inline-block;
			width: 0.2rem;
			height: 0.8rem;
			background-color: @cor-ff6b00;
		}
	}
}
#barChart {
	width: 100vw;
	height: 15rem;
	margin: 0 auto;
}
</style>
