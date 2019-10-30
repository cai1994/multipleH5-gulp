<template>
	<div class="page">
		<div  class="mui-bar mui-bar-nav" style="height:0rem;padding:0rem">
			<header class="filterWrapper filterWrapperExp">
				<img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
			</header>
			<searchBar
				htmdEvt="teamPERF_teamPERFList_search"
				@searchName="getSearchName"
				v-if="tabs&&!dataFlag"
				:titleNmae="tabs[activeIndex].name"
			></searchBar>
			<P v-if="!dataFlag" class="tabs">
				<span
					:class="{active: activeFlag(index) }"
					v-for="(item,index) in tabs"
					:key="index"
					@click="selectIndex(index)"
				>{{item.name}}</span>
			</P>
			<div class="chartBlock">
				<dataSelect @onSelectYear="getTime" dateType="month" :fType="'team'"></dataSelect>
				<p class="ranking" htmdEvt="teamPERF_teamPERFList_toRanking" @click="toRanking">
					排名
					<span></span>
				</p>
			</div>
		</div>

		<!-- 上拉加载区域 -->
		<div class="mui-content">
			<div class="mui-scroll-wrapper">
				<div class="listWrap mui-slider-group">
					<div class="mui-scroll"></div>
				</div>
			</div>
		</div>
		<ul v-show="false" class="tableList listTemp" id="tableList">
			<li class="topBottomDivide dataList" v-for="(item,index) in listData" :key="index">
				<div class="content">
					<div class="brachTitle">
						<p :index="index" htmdEvt="teamPERF_teamPERFList_toTeamYearsPERF">
							<span class="titleOrgName">{{item.orgName}}</span>
							<span class="yearPERF">年度业绩</span>
						</p>
					</div>
					<datasPERF class="datasPERF" v-if="item" :performanceObj="item" :typeName="'teamRanKing'"></datasPERF>
				</div>
				<p class="title">总业绩分布情况</p>
				<pieChart
					v-if="item.sourceVoList&&activeTabsFlag"
					class="peichart"
					:echartData="formattedData(item.sourceVoList)"
					:idindex="'pie'+page+index"
				></pieChart>
			</li>
		</ul>
		<list-loading :showListLoading="showListLoading"></list-loading>
		<div v-if="dataFlag" class="noDataInfo" style="display:block;height:12rem;position:relative;">
        <div class="noDataInner">
          <img src="/common/noData/img/noData.png" />
          <p>暂无数据</p>
        </div>
      </div>
	</div>
</template>
<script>
import "./teamPERFList.less";
import dataSelect from "../../common/dataSelect.vue";
import datasPERF from "../../common/datasPERF.vue";
import pieChart from "../../common/pieChart.vue";
import searchBar from "../../common/searchBar.vue";

//上拉加载
import muiPullDown from "@common/components/muiComponents/muiPullDown/muiPullDown";

//暂无数据
import noData from "@src/common/noData/noData";

//列表页加载数据使用的loading
import listLoading from "@common/components/vueComponents/loading/listLoading";

//黑条提示
import tipAction from "@common/components/otherComponents/tipAction/tipAction";

export default {
	data() {
		return {
			dataFlag: false,
			activeIndex: 0,
			tabs: null,
			page: 1,
			pageSize: 10,
			muiPullDown: muiPullDown,
			muiPullUpArr: [],
			listData: [],
			showListLoading: true,
			selectTime: null,
			orgName: "",
			activeTabsFlag: true
		};
	},
	components: {
		searchBar,
		datasPERF,
		dataSelect,
		pieChart,
		listLoading
	},
	methods: {
		getSearchName(name) {
			this.orgName = name;
			this.muiPullUpArr[0].dataDeal(3);
		},
		getTime(timeData) {
			this.listData = [];
			//获取子组件选择的日期时间
			this.selectTime = timeData.split("-");
			if (this.tabs != null) {
				this.muiPullUpArr[0].dataDeal(3);
			}
		},
		toTeamYear(key) {
			//跳转团队年度业绩
			let item = this.listData[key];
			let url = encodeURI(
				`${goUrl.teamYearsPERF}?year=${this.selectTime[0]}&month=${
					this.selectTime[1]
				}&orgCode=${item.orgCode}&orgName=${item.orgName}&orgType=${
					this.tabs[this.activeIndex].code
				}`
			);
			window.location.href = encodeURI(url);
		},
		toRanking() {
			//跳转当月排名
			let url = encodeURI(
				`${goUrl.teamRanking}?year=${this.selectTime[0]}&month=${
					this.selectTime[1]
				}&orgType=${this.tabs[this.activeIndex].code}&orgTypeName=${
					this.tabs[this.activeIndex].name
				}`
			);
			window.location.href = encodeURI(url);
		},
		selectIndex(index) {
			this.activeIndex = index;
			$("#scroll1")
				.find(".noDataInfo")
				.hide();

			this.muiPullUpArr[0].dataDeal(3);
		},
		// enterClick(event) {
		//   this.listData = [];
		//   if (event.keyCode == 13) {
		//     //如果按的是enter键 13是enter
		//     event.preventDefault(); //禁止默认事件（默认是换行）
		//     //获取用户输入的文字
		//     this.muiPullUpArr[0].dataDeal(3);
		//   }
		// },
		goBack() {
			window.location.href = "JStoApp?Action=backToApp";
			// window.history.go(-1);
		},
		activeFlag(index) {
			return this.activeIndex == index;
		},
		getTabs() {
			this.httpUrl = apiUrl.queryEmpOrgType;
			this.$axiosHttp.http(
				{
					url: this.httpUrl,
					needFailCallback: true,
					name: "查询tabs"
				},
				res => {
					this.tabs = [];
					let data = res.data.data;
					Object.keys(data).forEach(ele => {
						this.tabs.push({
							name: data[ele],
							code: ele
						});
					});
					if (splitUrl().orgType) {
						let data = this.tabs;
						for (let i = 0; i < data.length; i++) {
							if (data[i].code == splitUrl().orgType) {
								this.activeIndex = i;
							}
						}
					}
					let that = this;
					$("body").on(
						"tap",
						".listWrap .topBottomDivide .brachTitle >p",
						function() {
							that.toTeamYear($(this).attr("index"));
						}
					);
					that.muiPullUpArr.push(
						that.muiPullDown($(".listWrap"), function() {
							//上拉加载的回调函数
							that.getData($(".listWrap"));
						})
					);
				},
				(res, code) => {
					this.dataFlag=true
					this.showListLoading = false;
					tipAction(res.data.message);
				}
			);
		},
		getData() {
			//获得数据
			let that = this;
			//先重设一下页码
			that.page = Number($("#tableList_1").attr("pageNum")) + 1;

			this.httpUrl = apiUrl.queryOrganisePerform;

			let setting = {
				searchYear: this.selectTime[0],
				searchMonth: this.selectTime[1],
				pageStart: that.page, //起始页
				pageSize: that.pageSize,
				orgName: this.orgName,
				orgType: this.tabs[this.activeIndex].code
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
							if ($("#tableList  li").length > 0) {
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
					} else if (this.page == 1) {
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
				},
				(res, code) => {
					that.listData = [];
					if (code == "1000" && that.page != 1) {
						//操作成功，数据为空，且不是第一页，不能显示暂无数据的图标
						that.muiPullUpArr[0].dataDeal(2);
					} else {
						//其他情况，都可显示暂无数据
						this.showNoData = true;
						$(".listWrap")
							.find(".noDataInfo")
							.show();
						$(".listWrap")
							.find(".mui-scroll")
							.hide();

						//接口失败，调用dataDeal方法，做失败处理
						that.muiPullUpArr[0].dataDeal(1);
						if (res && res.data && res.data.message) {
							tipAction(res.data.message);
						}
					}
					that.showListLoading = false;
				}
			);
		},
		formattedData(data) {
			data.forEach(ele => {
				ele.name = ele.sourceName;
				ele.value = ele.sourceAmt;
			});
			return data;
		}
	},
	mounted() {
		if (
			window.location.href.indexOf("/teamPERFList/") != -1 &&
			splitUrl().orgName
		) {
			this.orgName = decodeURI(decodeURI(splitUrl().orgName));
		}
		this.getTabs();
	}
};
</script>
