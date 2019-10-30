<template>
<div>
	<div class="planner">理财师：{{recordGetData.empName}} {{recordGetData.createPeople}}</div>
	<div class="activityCon">

	  <div class="topCon">
		<div class="topImgBox">
		  <img src="/lgb/static/img/date.png" alt="" v-if="recordGetData.trackType== '0'">
		  <img src="/lgb/static/img/email.png" alt="" v-if="recordGetData.trackType== '2'">
		  <img src="/lgb/static/img/phone.png" alt="" v-if="recordGetData.trackType== '3'">
		  <img src="/lgb/static/img/wechat.png" alt="" v-if="recordGetData.trackType== '1'">
		</div>

		<div class="clientMsg">
		  <div class="clientName">{{map.trackTypeArr[recordGetData.trackType]}}客户{{recordGetData.customerName}}</div>
		  <div class="visit">陪访人员：{{map.talkWithArr[recordGetData.talkWith]}} {{recordGetData.accompanyingVisitsName}} ({{recordGetData.accompanyingVisits}})</div>
		</div>
	  </div>
	  <!-- 内容信息 -->
	  <div class="contentCon " :class="feedbackStatus ? 'noRadius' : ''">
		<!-- 信息 -->
		<div class="listCon">
		  <div class="basicInfo">
			<p>客户约访地点：<span class="fontWeight">{{map.placeArr[recordGetData.place]}}</span></p>
			<p>投资金额：<span class="fontWeight">{{recordGetData.investAmount}}万</span></p>
			<p>投资到账时间：<span class="fontWeight">{{recordGetData.accountingDate}}</span></p>
			<p>是否提出再见面：<span class="fontWeight">{{map.seeAgainArr[recordGetData.seeAgain]}}</span></p>
			<p>陪访确认：<span class="fontWeight">{{map.visitsConfirmArr[recordGetData.visitsConfirm]}}</span></p>
		  </div>
		  <div class="visitInfo">
			<h2>客户痛点</h2>
			<p>{{recordGetData.content}}</p>
		  </div>
		</div>
		<!-- 信息 -->
		<div class="evaluate" v-if="!feedbackStatus">
		  <div class="seeMoreLine"></div>
		  <h2>陪访人反馈</h2>
		  <p>{{recordGetData.feedback}}</p>
	  	</div>
	  </div>
	  	<div class="bottomBox" v-if="feedbackStatus"></div>
		<div class="estimate" v-if="feedbackStatus">
			<textarea v-model="message" :placeholder="placerHolderTxt" class="iconfont " maxlength="100"></textarea>
		</div>
	  <!-- 内容信息 -->
	  <bottom-fixedbutton btnText="确定" v-if="feedbackStatus" @clickbottomFixedBtn="sureBtn()"></bottom-fixedbutton>
  </div>
  
</div>
  
  
</template>

<script>
import "./remind.js"
import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton.vue'
import feedbackAffirm from '@src/common/feedbackAffirm/feedbackAffirm.vue'
import tipAction from "@common/components/otherComponents/tipAction/tipAction"
export default {
  components:{
	  bottomFixedbutton,
	  feedbackAffirm,
  },
  data(){
	return{
	  placerHolderTxt: '\ue600 请填写您的反馈…',
	  feedbackStatus: true,
	  message: '',
	  apiId: '',
	  recordGetData: {
		talkWith: 1,
		commentUserName: 132,
		commentUserCode: "H021237",
		place: 1,
	  },
	  map: {
			talkWithArr: ['','营总','团队长','IS','FC','同事帮谈','无'],
			placeArr: ['','公司','非公司','沙龙、活动'],
			seeAgainArr: ['','是','否'],
			trackTypeArr:['约见','微信','邮件','电话'],
			visitsConfirmArr:['未确认','已确认']
	  },
	  
	}
	
  },
  created:function(){
	this.apiId = splitUrl()['id']
	this.saveEva();
  },
  methods:{
	saveEva(){
		this.$axiosHttp.http({
		  method: "GET",
		  url: apiUrl.recordGetApi,
		  params:{
			id: this.apiId,
		  }
		}, (res) => {
			if(res.data.data.visitsConfirm == 1) { 
				this.feedbackStatus = false;
			} else{
				this.feedbackStatus = true;
			}
			this.recordGetData = res.data.data;
		}, res => {
			
		})
	},
	sureBtn(){
		// debugger
		if(this.message == "") {
			tipAction("请填写陪访人反馈");
			return false;
		}
		this.$axiosHttp.http({
			url: apiUrl.updateFeedBackApi,
			params:{
				id: this.apiId,
				feedback: this.message
		},
		}, (res) => {
			window.location.href = '/lgb/taskManager/remind/remindList.html';

		}, res => {
			tipAction(res.data.message);
		})

	},
  }

}
</script>


<style lang="less">
@import './remind.less';
</style>
