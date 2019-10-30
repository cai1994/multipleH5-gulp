<template>
  <section class="page">
    <header class="filterWrapper filterWrapperExp">
      <img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
      <div class="titleSpan">
        <span class="title">年度业绩</span>
        <span class="toMonth">月度业绩</span>
      </div>
    </header>
    <div class="dataDetail">
      <dataSelect dateType="year" @onSelectYear="getYear"></dataSelect>
      <datasPERF class="datasPERF" v-if="performanceObj" :performanceObj="performanceObj"></datasPERF>
    </div>
    <div class="chartBlock">
      <barChart
        v-if="echartData.length>=1"
        :echartMonth="echartMonth"
        :echartData="echartData"
        :selectYear="selectYear"
        type="personal"
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
// import "./yearsPERF.js";
import "./yearsPERF.less";
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
      echartMonth: []
    };
  },
  components: {
    barChart,
    datasPERF,
    dataSelect
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    toMonth() {
      let urlData = splitUrl();
      let url = "";
      if (this.selectYear == urlData.year) {
        url = `${goUrl.monthPERF}?year=${this.selectYear}&month=${urlData.month}`;
      } else {
        url = `${goUrl.monthPERF}?year=${this.selectYear}`;
      }
      window.location.href = url;
    },
    getYear(newValue) {
      this.selectYear = newValue;
      this.getYearData();
    },
    getYearData() {
      //获得年度业绩
      this.echartData = [];
      this.echartMonth = [];
      this.$axiosHttp.http(
        {
          name: "获取我的年度绩效查看",
          url: apiUrl.queryEmpYearPerform,
          needFailCallback: false,
          params: {
            searchYear: this.selectYear
          }
        },
        res => {
          if (res.data.status == "0000") {
            let data = res.data.data;
            this.performanceObj = data;
            let echartList = data.monthAchieveVoList;
            let that = this;
            if (echartList == [] || echartList.length == 0) {
            } else {
              echartList.forEach((ele, index) => {
                this.echartMonth.push(index + 1 + "月");
                this.echartData.push(ele.performanceAmt);
              });
            }
          }
        },
        res => {}
      );
    }
  }
};
</script>