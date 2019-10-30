<template>
	<section class="page">
		<header class="filterWrapper filterWrapperExp">
			<img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
			<span class="title">年度业绩</span>
		</header>
		<div class="dataDetail">
			<dataSelect dateType="year" @onSelectYear="getYear"></dataSelect>
			<p class="brachTitle">{{orgName}}</p>
			<datasPERF class="datasPERF" v-if="performanceObj" :performanceObj="performanceObj"></datasPERF>
		</div>
		<div class="chartBlock">
			<barChart
				v-if="echartMonth.length>=1"
				:echartMonth="echartMonth"
				:echartData="echartData"
				:selectYear="selectYear"
			></barChart>
			<div class="footNote">
				<div class="tips">
					<p>注:</p>
				</div>
				<p>总业绩为各条线销售系统的到账业绩，统计时间以系统到账时间为准。未登记系统的预约则无法进行统计。</p>
			</div>
		</div>
	</section>
</template>
<script>
// import "./teamYearsPERF.js";
import "./teamYearsPERF.less";
import barChart from "../../common/barChart";
import datasPERF from "../../common/datasPERF";
import dataSelect from "../../common/dataSelect";
export default {
  name: "yearsPREF",
  data() {
    return {
      selectYear: "",
      echartData: [],
      performanceObj: null,
      echartMonth: [],
      orgCode: null,
      orgName: ""
    };
  },
  components: {
    barChart,
    datasPERF,
    dataSelect
  },
  methods: {
    goBack() {
      // window.history.go(-1);
      let urlData = splitUrl();
      let url = "";
      url = `${goUrl.teamPERFList}?year=${urlData.year}&month=${urlData.month}&orgType=${urlData.orgType}`;
      window.location.href = url;
    },
    getYear(newValue, oldval) {
      this.selectYear = newValue;
      this.getData();
    },
    getData() {
      this.httpUrl = apiUrl.queryOrganiseYearPerform;
      this.echartData = [];
      this.echartMonth = [];
      let setting = {
        searchYear: this.selectYear,
        orgCode: splitUrl().orgCode
      };
      this.$axiosHttp.http(
        {
          url: this.httpUrl,
          needFailCallback: true,
          name: "查询列表",
          params: setting
        },
        res => {
          let data = res.data.data;
          this.performanceObj = data;
          let echartList = data.monthAchieveVoList;
          let that = this;
          if (echartList != [] && echartList.length != 0) {
            echartList.forEach((ele, index) => {
              this.echartMonth.push(index + 1 + "月");
              this.echartData.push(ele.performanceAmt);
            });
          } else {
            this.echartData = [];
          }
        },
        (res, code) => {}
      );
    }
  },
  mounted() {
    this.orgName = decodeURI(decodeURI(splitUrl().orgName));
  }
};
</script>