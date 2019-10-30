<template>
  <div class="activityCon">
    <!-- 头部信息 -->
      <div>
          <div class="topCon" v-if="!isFC">
              <i>{{customerInfo.fcCode}} {{customerInfo.fcName}}</i>
              <span>陪谈FC</span>
          </div>
          <div class="topCon" v-if="isFC">
              <i>{{customerInfo.empCode}} {{customerInfo.empName}}</i>
              <span>陪谈理顾</span>
          </div>
      </div>
    <!-- 头部信息 -->
    <!-- 内容信息 -->
    <div class="contentCon">
      <!-- 信息 -->
      <div class="listCon">
        <div class="basicInfo">
          <h2>{{customerInfo.custName}}</h2>
          <p>拜访对象：{{customerInfo.viewObject}}</p>
          <p>客户性质：{{customerInfo.custType}}</p>
          <p v-show="isAll">拜访日期：{{customerInfo.viewDate}}</p>
          <p v-show="isAll">联系方式：{{customerInfo.contactWay}}</p>

            <p v-show="isAll">投资金额：{{customerInfo.investAmount}} 万</p>
            <p v-show="isAll">投资到账时间：{{customerInfo.investPayDate}}</p>
            <p v-show="isAll">访谈地点：{{customerInfo.interviewPlace}}</p>
            <p v-show="isAll">是否提出下次见面：{{customerInfo.isMeet}}</p>

          <p v-show="isAll">拜访次数：{{customerInfo.viewTime}}</p>
          <p v-show="isAll">提交时间：{{$utils.momentFmtYmdhs(customerInfo.submitTime)}}</p>

            <p v-show="isAll && status == 0">录入人员：{{customerInfo.inputPeople}}</p>
            <p v-show="isAll && status == 0">系统来源：{{customerInfo.sysSource}}</p>
        </div>
        <div class="businessInfo" v-show="isAll">
          <h2>行业及主营业务</h2>
          <p>{{customerInfo.industry}}</p>
        </div>
        <div class="visitInfo">
          <h2>拜访详情</h2>
          <p>{{customerInfo.viewDetail}}</p>
        </div>
      </div>
      <!-- 信息 -->
      
      <div class="evaluate" v-if="isEvaluate">
        <!-- 查看更多 -->
        <div class="more down" @click="showAll()" v-if="down"><span>展开全部</span> </div>
        <div class="more up" @click="upAll()" v-if="up"><span>收起全部</span> </div>
        <!-- 查看更多 -->
        <!-- 评价 -->
        <evaluate-con :activityGrades="activityGrade" :submitTime="customerInfo.updateTime" :backTitle="backTitle" :backInfo="customerInfo.advice"></evaluate-con>
        <!-- 评价 -->
      </div>
    </div>
    <!-- 内容信息 -->
    <bottom-fixedbutton btnText="反馈" v-if="isfeedback" @clickbottomFixedBtn="openTk()"></bottom-fixedbutton>
    <feedback-affirm v-if="isShow && customerInfo.confirmType !== 0" :titleText="titleText" :showHide="isShow"   v-on:hideTkValue="changeIsshow"  :activityGrade="activityGrades"  @save="saveEva"></feedback-affirm>
  </div>
  
</template>

<script>
import "./customerDetail.js"
import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton.vue'
import feedbackAffirm from '@src/fc/feedbackAffirm/feedbackAffirm.vue'
import evaluateCon from '@src/fc/evaluateInfo/evaluateInfo.vue'
export default {
  components:{
      bottomFixedbutton,
      feedbackAffirm,
      evaluateCon
  },
  data(){
    return{
      isAll:true,
      down:false,
      up:true,
      isEvaluate:true,
      isShow:false,
      titleText:"陪访评价",
      status:null,
      isfeedback:false,
      activityGrade:[
        {name:"陪访评价",no:1,value:3}
      ],
      activityGrades:[
        {name:"陪访评价",no:1,value:0}
      ],
      backTitle:"客户反馈",
      backInfo:"asdfasdfasdf",
      customerInfo:{
        empName:"",
        empCode:"",
        custName:"",
        viewObject:"",
        custType:"",
        viewDate:"",
        contactWay:"",
        viewTime:"",
        submitTime:"",
        updateTime:"",
        advice:"无",
        scoreStyle:"",
        viewDetail:""
      },
        isFC: false,
    }
    
  },
  created:function(){
    this.$utils.getDicData('custType',res => {
      this.wayList = res.custType;
      this.getDetailInfo();
    });
      this.$utils.getDicData('interviewPlace',res => {
          this.interviewPlaceDict = res.interviewPlace;
      });
      this.$utils.getDicData('sysSource',res => {
          this.sysSourceDict = res.sysSource;
      });
    if(splitUrl()['flag'] == "fc"){
        this.isFC = true;
      if(splitUrl()['status'] == 0){
        this.isEvaluate = false;
        this.isfeedback = false;
      }else if(splitUrl()['status'] == 1){
        this.isEvaluate = false;
        this.isfeedback = false;
      }
      else if(splitUrl()['status'] == 2){
        this.isEvaluate = true;
      }
    }else if(splitUrl()['flag'] == "task"){
        this.isFC = false;
      if(splitUrl()['status'] == 1){
        this.isEvaluate = false;
        this.isfeedback = true;
      }
      else if(splitUrl()['status'] == 2){
        this.isEvaluate = true;
      }
    }
    
  },
  methods:{
    showAll(){
      this.isAll = true;
      this.down = false;
      this.up = true;
    },
    upAll(){
      this.isAll = false;
      this.down = true;
      this.up = false;
    },
    openTk(){
      this.isShow = true;
    },
    changeIsshow(value){
      this.isShow = value;
    },
    saveEva(value){
      this.activityGrade = value.evaluateData;
      this.isShow = value.hideTkValue;
      this.customerInfo.advice = value.adviceData;
        this.$axiosHttp.http({
          url: apiUrl.confirmInterviewFeedbackApi,
          params:{
            id:splitUrl()['id'],
            advice:this.customerInfo.advice,
            scoreStyle:this.activityGrade[0].value,
          }
        }, (res) => {
          this.getDetailInfo();
        }, res => {
            
        })
    },
    getDetailInfo(){
      this.$axiosHttp.http({
          url: apiUrl.getCustInterviewInfoApi,
          params:{
            id:splitUrl()['id']
          },
        }, (res) => {
          this.customerInfo = res.data.data;
          if(this.customerInfo.advice=="" || this.customerInfo.advice ==null){
            this.customerInfo.advice = "无";
          }
          if(this.customerInfo.industry=="" || this.customerInfo.industry ==null){
            this.customerInfo.industry = "无";
          }
          if(this.customerInfo.viewDetail=="" || this.customerInfo.viewDetail ==null){
            this.customerInfo.viewDetail = "无";
          }
          this.customerInfo.updateTime = this.$utils.momentFmtYmdhs(res.data.data.updateTime);
          this.customerInfo.custType = this.$utils.parseDic(res.data.data.custType,this.wayList);
          this.customerInfo.interviewPlace = this.$utils.parseDic(res.data.data.interviewPlace,this.interviewPlaceDict);
          this.customerInfo.sysSource = this.$utils.parseDic(res.data.data.sysSource,this.sysSourceDict);
          this.customerInfo.isMeet = this.customerInfo.isMeet == 0 ? "否" : "是";
          this.status = res.data.data.status;
          if(this.status == "2"){
            this.isEvaluate = true;
            this.isfeedback = false;
          }else{
            this.isEvaluate = false;
          }
          this.activityGrade[0].value = res.data.data.scoreStyle;

        }, res => {
            
        })
    }
  }

}
</script>


<style lang="less">
@import './customerDetail.less';
</style>
