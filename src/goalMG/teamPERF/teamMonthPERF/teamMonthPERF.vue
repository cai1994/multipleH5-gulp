<template>
  <ul class="page">
    <header class="filterWrapper filterWrapperExp">
      <img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
      <span class="title">{{this.timeYM.year}}年{{this.timeYM.month}}月业绩明细</span>
    </header>
    <!-- 上拉加载区域 -->
    <div class="listWrap mui-slider-group">
      <div class="mui-scroll"></div>
    </div>
    <template>
      <ul class="tableList listTemp" id="tableList">
        <li class="topBottomDivide dataList" v-for="(item,index) in listData" :key="index">
          <p class="title">
            <span>{{item.projectName}}</span>
          </p>
          <p>
            <span class="person">{{item.empName}}</span>
            <span class="r perfType">{{item.sourceName}}</span>
          </p>
          <p>
            <span class="labelText">预约时间:</span>
            {{item.reserveTime}}
          </p>
          <p>
            <span class="labelText">预约金额:</span>
            {{formate(item.reserveAmt)}}
          </p>
          <p>
            <span class="labelText">到账时间:</span>
            {{item.transTime}}
          </p>
          <p>
            <span class="labelText">到账金额:</span>
            {{formate(item.transMoney)}}
          </p>
          <p>
            <span class="labelText">业绩系数:</span>
            {{item.achieveRate}}
          </p>
          <p>
            <span class="labelText">业绩:</span>
            {{formate(item.performAmt)}}
          </p>
        </li>
      </ul>
    </template>
    <list-loading :showListLoading="showListLoading"></list-loading>
  </ul>
</template>
<script>
import "./teamMonthPERF.less";
import stringUil from "@common/js/util/stringUtil.js";
import detailItem from "../../common/detailItem.vue";

//上拉加载
import muiPullDown from "@common/components/muiComponents/muiPullDown/muiPullDown";

//暂无数据
import noData from "@src/common/noData/noData";

//列表页加载数据使用的loading
import listLoading from "@common/components/vueComponents/loading/listLoading";

//黑条提示
import tipAction from "@common/components/otherComponents/tipAction/tipAction";
export default {
  components: {
    detailItem,
    listLoading,
    noData
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      muiPullDown: muiPullDown,
      muiPullUpArr: [],
      listData: [],
      showListLoading: true,
      timeYM: []
      //showNoData:false,//默认不展示暂无数据的图标
    };
  },
  methods: {
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
    formate(num){
      if(num){
        if(num!=0){
          return "￥"+stringUil.comdify(this.divide(num ,10000))+"(万元)"
        }
        return 0
      }else{
        return 0
      }
    },
    goBack() {
      //返回月度页面
      window.history.go(-1);
    },
    getData() {
      //获得数据
      let that = this;
      //先重设一下页码
      that.page = Number($("#tableList_1").attr("pageNum")) + 1;

      this.httpUrl = apiUrl.queryOrganiseDetailPerform;
      this.timeYM = splitUrl();
      let setting = {
        searchYear: this.timeYM.year,
        searchMonth: this.timeYM.month,
        pageStart: that.page, //起始页
        pageSize: that.pageSize,
        orgCode:splitUrl().orgCode,
        orgType:splitUrl().orgType
      };
      if (that.page == 1) {
        //请求的是第一页的数据
        //请求之前，如果是第一页展示loading
        that.showListLoading = true;
        //隐藏暂无数据的图标
        that.showNoData = false;
        $(".listWrap")
          .find(".noDataInfo")
          .hide();
        $(".listWrap")
          .find(".mui-scroll")
          .show();
      }
      that.$axiosHttp.http(
        {
          url: that.httpUrl,
          needFailCallback: true,
          name: "查询列表",
          params: setting
        },
        res => {
          //隐藏加载提示
          //this.showLoading = false;
          if (res.data.data.list.length) {
            let data = res.data.data.list;
            that.listData = data;
            $(".listWrap")
              .find(".noDataInfo")
              .hide();
            $(".listWrap")
              .find(".mui-scroll")
              .show();
            that.$nextTick(() => {
              if ($("#tableList  >li").length > 0) {
                $(".listWrap .tableList .mui-pull-bottom-pocket").before(
                  $("#tableList")
                    .clone()
                    .find(">li")
                );
              }
            });
            if (that.listData.length < that.pageSize) {
              //已不够10条
              that.muiPullUpArr[0].dataDeal(2);
            } else {
              //够10条，还可以继续上拉
              //that.page++;
              that.muiPullUpArr[0].dataDeal(0);
            }
          }
          if (that.listData.length == 0) {
            $(".listWrap")
              .find(".noDataInfo")
              .show();
            $(".listWrap")
              .find(".mui-scroll")
              .hide();
          }
          that.showListLoading = false;
        },
        (res, code) => {
          that.listData = [];
          if (code == "1000" && that.page != 1) {
            //操作成功，数据为空，且不是第一页，不能显示暂无数据的图标
            that.muiPullUpArr[0].dataDeal(2);
          } else {
            //其他情况，都可显示暂无数据
            //this.showNoData = true;
            $(".listWrap")
              .find(".noDataInfo")
              .show();
            $(".listWrap")
              .find(".mui-scroll")
              .hide();

            //接口失败，调用dataDeal方法，做失败处理
            that.muiPullUpArr[0].dataDeal(1);
          }
          that.showListLoading = false;
        }
      );
    }
  },
  mounted() {
    let that = this;
    that.muiPullUpArr.push(
      that.muiPullDown($(".listWrap"), function() {
        //上拉加载的回调函数
        that.getData($(".listWrap"));
      })
    );
  }
};
</script>