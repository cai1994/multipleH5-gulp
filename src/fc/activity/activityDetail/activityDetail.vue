<template>
  <div class="activityCon">
    <!-- 头部信息 -->
    <div class="topCon">
      <i>{{activityInfo.createId}} {{activityInfo.fcName}}</i>
      <span>FC名称</span>
    </div>
    <!-- 头部信息 -->
    <!-- 内容信息 -->
    <div class="contentCon">
      <!-- 信息 -->
      <div class="listCon">
        <div class="basicInfo">
          <h2>{{activityInfo.activityName}}</h2>
          <p>举办时间：{{activityInfo.holdTime}}</p>
          <p v-show="isAll">举办地点：{{activityInfo.holdPlace}}</p>
          <p v-show="isAll">活动/培训形式：{{activityInfo.trainingWay}}</p>
          <p v-show="isAll">所属区域：{{activityInfo.trainingAreaName}}</p>
          <p v-show="isAll">参与人数：{{activityInfo.personNum}}</p>
          <p v-show="isAll">提交时间：{{activityInfo.submitTime}}</p>
        </div>
        <div class="visitInfo">
          <h2>活动/培训内容</h2>
          <p>{{activityInfo.trainingContent}}</p>
        </div>
      </div>
      <!-- 信息 -->
      
      <div class="evaluate" v-if="isEvaluate">
        <!-- 查看更多 -->
        <div class="more down" @click="showAll()" v-if="down"><span>展开全部</span> </div>
        <div class="more up" @click="upAll()" v-if="up"><span>收起全部</span> </div>
        <!-- 查看更多 -->
        <!-- 评价 -->
        <evaluate-con  :activityGrades="activityGrade" :submitTime="activityInfo.updateTime" :backInfo="activityInfo.advice"></evaluate-con>
        <!-- 评价 -->
      </div>
    </div>
    <!-- 内容信息 -->
    <bottom-fixedbutton btnText="反馈" v-if="isfeedback" @clickbottomFixedBtn="openTk()"></bottom-fixedbutton>
    <feedback-affirm v-if="isShow" :titleText="titleText" :showHide="isShow" v-on:hideTkValue= "changeIsshow"    @save="saveEva"></feedback-affirm>
  </div>
  
</template>

<script>
import "./activityDetail.js"
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
      titleText:"活动评分",
      status:null,
      isfeedback:false,
      activityGrade:[
        {name:"活动形式",no:1,value:5},
        {name:"活动安排",no:2,value:3},
        {name:"活动效果",no:3,value:4},
        {name:"专业度",no:4,value:4},
        {name:"帮助程度",no:5,value:5},
      ],
      activityInfo:{
        fcName:"",
        createId:"",
        activityName:"",
        holdTime:"",
        updateTime:"",
        holdPlace:"",
        trainingWay:"",
        trainingAreaName:"",
        personNum:"",
        submitTime:"",
        advice:"无"
      },
      evaluateList:[],
      wayList:[]
    }
    
  },
  created:function(){
    this.$utils.getDicData('trainingWay',res => {
      this.wayList = res.trainingWay;
      this.getDetailInfo();
    });
    
      if(splitUrl()['flag'] == "fc"){
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
      this.activityInfo.advice = value.adviceData;
      this.isShow = value.hideTkValue;
        this.$axiosHttp.http({
          url: apiUrl.confirmTrainingFeedbackApi,
          params:{
            id:splitUrl()['id'],
            advice:this.activityInfo.advice,
            scoreStyle:this.activityGrade[0].value,
            scorePlan:this.activityGrade[1].value,
            scoreEffect:this.activityGrade[2].value,
            scoreProfess:this.activityGrade[3].value,
            scoreHelp:this.activityGrade[4].value
          }
        }, (res) => {
          this.getDetailInfo();
        }, res => {
            
        })
    },
    getDetailInfo(){
      this.$axiosHttp.http({
          url: apiUrl.getTrainingInfoApi,
          params:{
            id:splitUrl()['id']
          },
        }, (res) => {
          this.activityInfo = res.data.data;
          this.status = res.data.data.status;
          if(this.status == "2"){
            this.isEvaluate = true;
            this.isfeedback = false;
          }else{
            this.isEvaluate = false;
          }
          this.activityGrade[0].value = res.data.data.scoreStyle;
          this.activityGrade[1].value = res.data.data.scorePlan;
          this.activityGrade[2].value = res.data.data.scoreEffect;
          this.activityGrade[3].value = res.data.data.scoreProfess;
          this.activityGrade[4].value = res.data.data.scoreHelp;
          this.activityInfo.trainingWay = this.$utils.parseDic(res.data.data.trainingWay,this.wayList);
        }, res => {
            
        })

    },
  }

}
</script>


<style lang="less">
@import './activityDetail.less';
</style>
