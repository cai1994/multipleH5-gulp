<template>
	<div class="dateSelect">
		<div class="clearfix inlineBlock" v-if="leftFlag" @click="beforeTime()">
			<span class="l lTriangle triangle" :class="flag ?'lTeamTriangle':''"></span>
		</div>
		<div class="selectIpt" @click="selectDate">
			<input type="text" v-model="dateStr" class="ipt" :class="flag ? 'teamInpt':''" />
		</div>
		<div class="r clearfix inlineBlock" v-if="rightFlag" @click="afterTime()">
			<span class="r rTriangle triangle" :class="flag ? 'rTeamTriangle' :''"></span>
		</div>
	</div>
</template>
<script>
import popPicker from "@src/common/mui/popPicker/popPicker.js";
import "@common/less/mui/resetMuiPop.less";
import "@common/vendor/mui/js/mui.picker.min.js"; //MUI日历和下拉菜单

import "@common/components/muiComponents/muiPop/popPicker.js"; //MUI下拉菜单
import { debug } from "util";

export default {
	data() {
		return {
			dateStr: "", //选中的日期
			yearArr: [], //2009至今的年份数组
			flag: false,
			month: "",
			year: ""
		};
	},
	props: {
		fType: String,
		dateType: String
	},
	computed: {
		leftFlag() {
			if (this.dateType == "year") {
				return this.dateStr <= 2009 ? false : true;
			} else {
				let dateArr = this.dateStr.split("-");
				if (dateArr[1] == 1 && dateArr[0] == 2009) {
					return false;
				} else {
					return true;
				}
			}
		},
		rightFlag() {
			if (this.dateType == "year") {
				return this.dateStr >= this.geCurDate().curYear ? false : true;
			} else {
				let dateArr = this.dateStr.split("-");
				let curTime = this.geCurDate();
				if (dateArr[0] == curTime.curYear && dateArr[1] == curTime.curMonth) {
					return false;
				} else {
					return true;
				}
			}
		}
	},
	watch: {
		dateType(newval, oldValue) {
			if (oldValue) {
				if (oldValue == "month") {
					let arr = this.dateStr.split("-");
					this.year = arr[0];
					this.month = arr[1];
				} else {
					this.year = this.dateStr;
				}
				this.dateStr =
					newval == "year" ? this.year : this.year + "-" + this.month;
			}
		},
		dateStr(newValue, oldValue) {
			this.$emit("onSelectYear", newValue);
		},
		fType(newValue, oldvalue) {
			this.flag = newValue == "team" ? true : false;
		}
	},
	methods: {
		//筛选年月
		selectDate() {
			let dateObj = this.geCurDate();
			if (this.dateType == "year") {
				//获取2009至今的年份数组
				for (let index = 2009; index <= dateObj.curYear; index++) {
					const item = {
						value: index,
						text: index
					};
					this.yearArr.push(item);
				}
				let picker = new mui.PopPicker();
				picker.setData(this.yearArr);
				picker.pickers[0].setSelectedValue(this.dateStr);
				picker.show(SelectedItem => {
					this.dateStr = SelectedItem[0].value;
				});
			} else {
				var dtPicker = new mui.DtPicker({
					type: "month",
					value: this.dateStr ? this.dateStr : null,
					beginYear: 2009,
					endYear: dateObj.curYear,
					endMonth: dateObj.curMonth
				});
				dtPicker.show(SelectedItem => {
					this.dateStr = SelectedItem.value;
				});
				// popPicker.pickerDate(
				//   {
				//     type: "month",
				//     beginYear: 2009,
				//     endYear: dateObj.curYear,
				//     endMonth: dateObj.curMonth
				//   },
				//   res => {
				//     this.dateStr = res.value;
				//   }
				// );
			}
		},
		//获取此时的年月
		geCurDate() {
			let date = new Date();
			let curYear = date.getFullYear();
			//月份在js中是从0开始 所以加一
			let curMonth = date.getMonth() + 1;
			return { curYear: curYear, curMonth: this.getNumStr(curMonth) };
		},
		//将小于10的数前加0
		getNumStr(monNum) {
			return monNum < 10 ? "0" + monNum : monNum;
		},
		beforeTime() {
			if (this.dateType == "year") {
				//为时间单位为  年
				this.dateStr = parseInt(this.dateStr) - 1;
			} else {
				//为时间单位为  月
				let dateTime = this.dateStr.split("-");
				dateTime[0] =
					dateTime[1] == 1 ? parseInt(dateTime[0]) - 1 : dateTime[0];
				dateTime[1] = dateTime[1] == 1 ? 12 : parseInt(dateTime[1]) - 1;
				this.dateStr = dateTime[0] + "-" + this.getNumStr(dateTime[1]);
			}
		},
		afterTime() {
			if (this.dateType == "year") {
				//为时间单位为  年
				this.dateStr = parseInt(this.dateStr) + 1;
			} else {
				//为时间单位为  月
				let dateTime = this.dateStr.split("-");
				dateTime[0] =
					dateTime[1] == 12 ? parseInt(dateTime[0]) + 1 : dateTime[0];
				dateTime[1] = dateTime[1] == 12 ? 1 : parseInt(dateTime[1]) + 1;
				this.dateStr = dateTime[0] + "-" + this.getNumStr(dateTime[1]);
			}
		}
	},
	mounted() {
		this.flag = this.fType == "team" ? true : false;
		let dateObj = this.geCurDate();
		if (splitUrl().year) {
			//路由是否传参year
			dateObj = {
				curYear: splitUrl().year
			};
			if (this.dateType == "month") {
				if (splitUrl().year == this.geCurDate().curYear) {
					//传值是否为当年，是的话则月份为当月，否则默认第一个月
					dateObj = {
						curYear: splitUrl().year,
						curMonth: splitUrl().month
					};
				} else {
					dateObj = {
						curYear: splitUrl().year,
						curMonth: splitUrl().month ? splitUrl().month : "01"
					};
				}
			}
		}
		this.dateStr =
			this.dateType == "year"
				? `${dateObj.curYear}`
				: `${dateObj.curYear}-${dateObj.curMonth}`;
	}
};
</script>
<style lang="less" scoped>
@import "~@common/less/color.less";
.dateSelect {
	padding: 0 9vw;
	width: 60%;
	height: 1.3rem;
	margin: auto;
	position: relative;
	.selectIpt {
		display: inline-block;
		height: 1.3rem;
		width: 40%;
		color: #3c3c3c;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.inlineBlock {
		display: inline-block;
	}
	.l {
		float: left;
	}
	.r {
		float: right;
	}
	.triangle {
		margin-top: 0.2rem;
		width: 0.5rem;
		height: 0.5rem;
		box-sizing: border-box;
		border: rgba(255, 255, 255,0) 0.25rem solid;
	}
	.lTriangle {
		border-right: rgba(255, 255, 255, 1) 0.25rem solid;
	}
	.rTriangle {
		border-left: rgba(255, 255, 255, 1) 0.25rem solid;
	}
	.ipt {
		border: rgba(255,255,255,0.5) 0.05rem solid;
		color: #fff;
		border-radius: 1rem;
		line-height: 1.2rem;
		height: 1.2rem;
		width: 100%;
		text-align: center;
		font-size: 0.7rem;
		background-color: rgba(0, 0, 0, 0);
	}
}
.lTeamTriangle {
	border-right: rgba(57, 61, 79, 1) 0.5rem solid !important;
}
.rTeamTriangle {
	border-left: rgba(57, 61, 79, 1) 0.5rem solid !important;
}
.teamInpt {
	border: #393d4f 0.05rem solid !important;
	color: #393d4f !important;
}
</style>
