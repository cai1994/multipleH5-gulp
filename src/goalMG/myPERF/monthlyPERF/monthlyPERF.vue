<template>
	<section class="page">
		<header class="filterWrapper filterWrapperExp">
			<img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
			<div class="titleSpan">
				<span
					class="toYear"
					:class="{'title':activeFlag=='year'}"
					htmdEvt="myPERF_monthlyPERF_toyear"
					@click="toYearTab"
				>年度业绩</span>
				<span class="toYear" :class="{'title':activeFlag=='month'}" @click="activeFlag='month'">月度业绩</span>
			</div>
		</header>
		<div class="dataDetail">
			<dataSelect @onSelectYear="getTimeData" :dateType="activeFlag"></dataSelect>
			<datasPERF
				class="datasPERF"
				v-if="monthOrYear[activeFlag].performanceObj"
				:performanceObj="monthOrYear[activeFlag].performanceObj"
			></datasPERF>
			<div v-else class="datasPERF"></div>
		</div>
		<div class="chartBlock">
			<p class="detailPREF" v-if="activeFlag=='month'&&!pieFlag">
				<span @click="toDetail(monthOrYear.month.selectTime)">
					<span>查看业绩详情</span>
					<span class="icon"></span>
				</span>
			</p>
			<p v-if="activeFlag=='month'" class="titleEchart">月度总业绩分布情况</p>
			<pieChart
				v-if="monthOrYear.month.echartData!=[]&&monthOrYear.month.echartData.length!=0&&activeFlag=='month'"
				idindex="pieChart"
				:echartData="monthOrYear.month.echartData"
			></pieChart>
			<barChart
				v-if="monthOrYear.year.echartData.length>=1&&activeFlag=='year'"
				:echartMonth="monthOrYear.year.echartMonth"
				:echartData="monthOrYear.year.echartData"
				:selectYear="monthOrYear.year.selectTime"
				type="personal"
			></barChart>
			<div v-if="pieFlag" class="noDataInfo" style="display:block;height:12rem;position:relative;">
				<div class="noDataInner">
					<img src="/common/noData/img/noData.png" />
					<p>暂无数据</p>
				</div>
			</div>
			<div class="footNote">
				<div class="tips">
					<p>注:</p>
				</div>
				<p class="text">总业绩为各条线销售系统的到账业绩，统计时间以系统到账时间为准。未登记系统的预约则无法进行统计。</p>
			</div>
		</div>
	</section>
</template>
<script>
// import "./monthlyPERF.js";
import "./monthlyPERF.less";
import pieChart from "../../common/pieChart";
import datasPERF from "../../common/datasPERF";
import dataSelect from "../../common/dataSelect";
import barChart from "../../common/barChart";
export default {
	name: "monthlyPREF",
	data() {
		return {
			monthOrYear: {
				month: {
					getTime: "getTime",
					label: "month",
					selectTime: "",
					performanceObj: null,
					echartData: [],
					sourceVoList: []
				},
				year: {
					getTime: "getYear",
					label: "year",
					selectTime: "",
					performanceObj: null,
					echartData: [],
					sourceVoList: [],
					echartMonth: []
				}
			},
			activeFlag: "month",
			selectTime: null, //选中时间
			performanceObj: null,
			pieFlag: false,
			echartData: [],
			sourceVoList: [],
			echartMonth: []
		};
	},
	components: {
		pieChart,
		datasPERF,
		dataSelect,
		barChart
	},
	methods: {
		toYearTab(){
			this.activeFlag='year'
			this.pieFlag=false
		},
		getTimeData(timeData) {
			//获取子组件选择的日期时间
			if (this.activeFlag == "month") {
				this.monthOrYear[this.activeFlag].selectTime = timeData.split("-");
				this.getMonData();
			} else {
				this.monthOrYear[this.activeFlag].selectTime = timeData;
				this.getYearData();
			}
		},
		goBack() {
			window.location.href = "JStoApp?Action=backToApp";
			// window.history.go(-1);
		},
		getYearData() {
			//获得年度业绩
			this.monthOrYear.year.echartData = [];
			this.monthOrYear.year.echartMonth = [];
			this.$axiosHttp.http(
				{
					name: "获取我的年度绩效查看",
					url: apiUrl.queryEmpYearPerform,
					needFailCallback: false,
					params: {
						searchYear: this.monthOrYear.year.selectTime
					}
				},
				res => {
					if (res.data.status == "0000") {
						let data = res.data.data;
						this.monthOrYear.year.performanceObj = data;
						let echartList = data.monthAchieveVoList;
						let that = this;
						if (echartList == [] || echartList.length == 0) {
						} else {
							echartList.forEach((ele, index) => {
								this.monthOrYear.year.echartMonth.push(index + 1 + "月");
								this.monthOrYear.year.echartData.push(ele.performanceAmt);
							});
						}
					}
				},
				res => {}
			);
		},
		toDetail(time) {
			//跳转到我的绩效详情
			let url = `${goUrl.detailPERF}?year=${time[0]}&month=${
				time[1]
			}`;
			window.location.href = url;
		},
		getMonData() {
			this.echartData = [];
			this.pieFlag = false;
			this.$axiosHttp.http(
				{
					name: "获取我的月度绩效查看",
					url: apiUrl.queryEmpMonthPerform,
					needFailCallback: true,
					params: {
						searchYear: this.monthOrYear.month.selectTime[0],
						searchMonth: this.monthOrYear.month.selectTime[1]
					}
				},
				res => {
					if (res.data.status == "0000") {
						let data = res.data.data;
						this.monthOrYear.month.performanceObj = data;
						this.monthOrYear.month.echartData = data.sourceVoList;
						if (
							this.monthOrYear.month.echartData == [] ||
							this.monthOrYear.month.echartData.length == 0
						) {
							this.pieFlag = true;
						} else {
							this.monthOrYear.month.echartData.forEach(ele => {
								ele.name = ele.sourceName;
								ele.value = ele.sourceAmt;
							});
						}
					}
				},
				res => {
					this.pieFlag = true;
				}
			);
		}
	},
	created() {}
};
</script>