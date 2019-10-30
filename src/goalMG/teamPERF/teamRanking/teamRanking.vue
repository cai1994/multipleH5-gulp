<template>
	<div class="page rangKing" :class="{'noTabs':!(selectList&&selectList.length>0)}">
		<div class="topFixed">
			<header>
				<div style="height:2rem">
					<img src="/goalMG/static/img/back-gray.png" class="r filter" @click="goBack()" />
					<span class="title">{{selYear}}年{{selMonth}}月{{orgTypeName}}排名</span>
				</div>
			</header>
			<P class="tabs" v-if="selectList&&selectList.length>0">
				<span
					htmdEvt="teamPERF_teamRanking_searchSelect"
					:class="{active: activeFlag(index) }"
					v-for="(item,index) in selectList"
					:key="index"
					@click="selectIndex(index)"
				>{{item.rankName.slice(0,-2)}}</span>
			</P>
		</div>
		<searchBar
			htmdEvt="teamPERF_teamRanking_search"
			@searchName="getSearchName"
			v-if="selectList&&selectList.length!=0"
			:titleNmae="titleSearchName()"
		></searchBar>
		<!-- 上拉加载区域 -->
		<div class="listWrap mui-slider-group">
			<div class="mui-scroll"></div>
		</div>
		<template>
			<ul class="tableList listTemp" id="tableList">
				<li
					htmdEvt="teamPERF_teamRanking_toTeamMonthPERF"
					class="topBottomDivide dataList"
					v-for="(item,index) in listData"
					:class="{'myBgc':selectList!=[]&&selectList[activeIndex]&&selectList[activeIndex].rankNum!=0&&item.restrain==1 ? true : false}"
					:key="index"
				>
					<p class="titleRacking" :orgName="item.orgName">
						<span v-if="item.orderNum>3" class="orderNum">{{item.orderNum}}</span>
						<img
							class="orderNum"
							:src="'/goalMG/static/img/'+(item.orderNum-1)+'.png'"
							v-if="item.orderNum<=3"
						/>
						<span
							class="tips"
							v-show="selectList!=[]&&selectList[activeIndex]&&selectList[activeIndex].rankNum!=0&&item.restrain==1"
						>当前排名第{{item.orderNum}}</span>
						<!-- <span v-show="contrArea!=0">第{{item.orderNum}}名</span> -->
						<span class="orNname">{{item.orgName}}</span>
					</p>
					<datasPERF
						class="datasPERF"
						v-if="item&&item!=[]"
						:performanceObj="item"
						:typeName="'teamRanKing'"
					></datasPERF>
				</li>
			</ul>
		</template>
		<list-loading :showListLoading="showListLoading"></list-loading>
	</div>
</template>
<script>
import "./teamRanking.less";
import datasPERF from "../../common/datasPERF.vue";
import searchBar from "../../common/searchBar.vue";
//上拉加载
import muiPullDown from "@common/components/muiComponents/muiPullDown/muiPullDown";

//暂无数据
import noData from "@src/common/noData/noData";

//列表页加载数据使用的loading
import listLoading from "@common/components/vueComponents/loading/listLoading";

//黑条提示
import tipAction from "@common/components/otherComponents/tipAction/tipAction";
import { debug } from "util";
export default {
	data() {
		return {
			selectList: [],
			page: 1,
			pageSize: 10,
			muiPullDown: muiPullDown,
			muiPullUpArr: [],
			listData: [],
			showListLoading: true,
			orgName: "",
			selYear: null,
			selMonth: null,
			orgTypeName: "",
			activeIndex: "0"
		};
	},
	components: {
		datasPERF,
		listLoading,
		searchBar
	},
	methods: {
		titleSearchName() {
			return this.selectList.length > 0
				? this.selectList[this.activeIndex].rankName
				: this.orgTypeName;
		},

		getSearchName(name) {
			this.orgName = name;
			this.muiPullUpArr[0].dataDeal(3);
		},
		goBack() {
			let urlData = splitUrl();
			let url = "";
			url = `${goUrl.teamPERFList}?year=${urlData.year}&month=${urlData.month}&orgType=${urlData.orgType}`;
			window.location.href = url;
		},
		selectIndex(index) {
			this.activeIndex = index;
			this.muiPullUpArr[0].dataDeal(3);
		},
		activeFlag(index) {
			return this.activeIndex == index;
		},
		getData() {
			//获得数据
			let that = this;
			//先重设一下页码
			that.page = Number($("#tableList_1").attr("pageNum")) + 1;

			that.httpUrl = apiUrl.queryOrganisePerforms;

			let setting = {
				searchYear: splitUrl().year,
				searchMonth: splitUrl().month,
				pageStart: that.page, //起始页
				pageSize: that.pageSize,
				rankType:
					that.selectList && that.selectList.length > 0
						? that.selectList[that.activeIndex].rankNum
						: null, //下拉选项筛选
				orgName: this.orgName,
				orgType: splitUrl().orgType //tab筛选
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
			this.$axiosHttp.http(
				{
					url: that.httpUrl,
					needFailCallback: true,
					name: "查询列表",
					params: setting
				},
				res => {
					//隐藏加载提示
					//this.showLoading = false;
					if (res.data.data.length) {
						let data = res.data.data;
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
						//this.showNoData = true;
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
		// toTeamList(orgName) {
		//   let url = encodeURI(
		//     `${goUrl.teamPERFList}?year=${splitUrl().year}&month=${
		//       splitUrl().month
		//     }&orgName=${orgName}&orgType=${splitUrl().orgType}`
		//   );
		//   window.location.href = encodeURI(url);
		// },
		getStatus() {
			//获取地区编码
			this.httpUrl = apiUrl.queryEmpRankType;
			let setting = {
				orgType: splitUrl().orgType
			};
			this.$axiosHttp.http(
				{
					url: this.httpUrl,
					needFailCallback: true,
					name: "查询列表",
					params: setting
				},
				res => {
					if (res && res.data && res.data.data) {
						this.selectList = res.data.data;
						// this.selectList = [];
					}
					let that = this;
					// $(".rangKing").on(
					//   "tap",
					//   ".listWrap .topBottomDivide .titleRacking",
					//   function() {
					//     that.toTeamList($(this).attr("orgName"));
					//   }
					// );
					that.muiPullUpArr.push(
						that.muiPullDown($(".listWrap"), function() {
							//上拉加载的回调函数
							that.getData($(".listWrap"));
						})
					);
				},
				(res, code) => {}
			);
		}
	},
	mounted() {
		this.getStatus();
		this.selYear = splitUrl().year;
		this.selMonth = splitUrl().month;
		this.orgTypeName = decodeURI(decodeURI(splitUrl().orgTypeName));
	}
};
</script>