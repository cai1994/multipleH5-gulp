<template>
	<div class="dataList" :class="{'RanKingStyle':flag}">
		<div class="twoRow">
			<div class="transPerformance">
				<p class="label">总业绩(万)</p>
				<p class="bFont">{{filterNum(performanceObj.transPerformance)}}</p>
			</div>
			<div class="transMoney">
				<p class="label textRight">到账金额(万)/笔数</p>
				<p class="bFont textRight">
					{{filterNum(performanceObj.transMoney)}}/
					<span>{{performanceObj.transNumber}}</span>
				</p>
			</div>
		</div>
		<div class="threeRow">
			<div class="minDiv">
				<p class="label">预约笔数</p>
				<p>{{performanceObj.reserveNumber}}</p>
			</div>
			<div class="centerDiv">
				<p class="label textCenter">预约金额(万)</p>
				<p class="textCenter">{{filterNum(performanceObj.reserveAmt)}}</p>
			</div>
			<div class="rightDiv">
				<p class="label textRight">预期业绩(万)</p>
				<p class="textRight">{{filterNum(performanceObj.expecdPerformance)}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import stringUil from "@common/js/util/stringUtil.js";
export default {
	data() {
		return {
			flag: false
			// reserveAmt:null,//预约金额
			// reserveNumber:null,//预约笔数
			// expecdPerformance:null,//预约业绩
			// transMoney:null,//到账金额
			// transNumber:null,//到账笔数
			// transPerformance:null,//到账业绩
		};
	},
	props: {
		performanceObj: Object,
		typeName: String
	},
	methods: {
		divide(arg1, arg2) {
			var t1 = 0,
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
		filterNum(num) {
			if(num||num==0){
				if(num==0){
					return 0
					}
					return stringUil.comdify(this.divide(num, 10000));
			}else{
				return "0"
			}
		}
	},
	mounted() {
		this.flag = this.typeName == "teamRanKing" ? true : false;
	}
};
</script>
<style lang="less" scoped>
.dataList {
	margin: 0.2rem 0;
	font-size: 0.8rem;
	.textRight {
		text-align: right;
	}
	.textCenter {
		text-align: center;
	}
	.twoRow {
		margin-top: 0.3rem;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		.label {
			white-space: nowrap;
		}
		.transPerformance {
			float: left;
		}
		.transMoney {
			float: right;
		}
		.bFont {
			margin-top: 0.35rem;
			font-weight: 900;
			font-size: 1rem;
			span {
				font-size: 0.85rem;
			}
		}
	}
	.threeRow {
		margin-top: 1rem;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		p {
			white-space: normal;
		}
		> div {
			width: 30%;
		}
		.centerDiv {
			margin: 0 1rem;
		}
		.rightDiv {
			flex-grow: 1;
		}
		.label {
			white-space: nowrap;
			margin-bottom: 0.2rem;
		}
	}
	p {
		color: #fff;
	}
	p.label {
		font-size: 0.6rem;
		color: #858d9d;
	}
}
.RanKingStyle {
	p {
		color: #394259 !important;
	}
	p.label {
		color: #858d9d !important;
	}
}
</style>
