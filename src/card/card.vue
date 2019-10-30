<template>
  <div class="container">

    <div class="contentBox">
      <div class="person"><img :src="cardInfo.portraitURL" alt=""></div>
      <p class="personName">
        <i></i>
        <span>{{cardInfo.name}}（{{cardInfo.postName}}）</span>
      </p>
      <div class="personTitle">
        <span v-if="cardInfo.jobNameOne">{{cardInfo.jobNameOne}}</span> 
        <span v-if="cardInfo.jobNameTwo">{{cardInfo.jobNameTwo}}</span>
        <span v-if="cardInfo.jobNameThree">{{cardInfo.jobNameThree}}</span>
      </div>
      <div class="personInfo">{{cardInfo.personalIntro}}</div>
      <div class="contractInfo">
        <div class="contractCon clearfix">
          <i class="iconfont icon-ziyuan2">&#xe611;</i>
          <span class="tipCon">联系电话</span>
          <a :href="'tel:'+cardInfo.mobile">{{cardInfo.mobile}}(拨打)</a>
        </div>
        <div class="contractCon clearfix">
          <i class="iconfont icon-ziyuan1">&#xe610;</i>
          <span class="tipCon">电子邮箱</span>
          
          <a v-clipboard:copy="cardInfo.email" v-clipboard:success="onCopyEmail" v-clipboard:error="onErrorEmail">(复制)</a>
          <em>{{cardInfo.email}}</em>
        </div>
        <div class="contractCon clearfix">
          <i class="iconfont icon-ziyuan">&#xe60f;</i>
          <span class="tipCon">公司名称</span>
          <a v-clipboard:copy="cardInfo.companyName" v-clipboard:success="onCopyName" v-clipboard:error="onErrorName">(复制)</a>
          <em>{{cardInfo.companyName}}</em>
        </div>
      </div>
      <div class="share" @click="toShare"></div>
      
    </div>
    <div class="registerCon" v-if="!this.appId">
      <a :href="cardInfo.jfRegisterHost+'/user/views/register.html?brokerNo='+brokerNo+'&trackModule=2'" class="register">立即注册恒天财富，获取更多资讯 >></a>
    </div>
      
  </div>
</template>





<style lang="less">
@import "./card.less";
</style>
<script>
// import tipAction from "../../../common/js/buriedPoint/htmd"

import Vue from "vue"
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//import htmd from "../../common/vendor/buriedPoint/htmd"
import tipAction from "../../common/components/otherComponents/tipAction/tipAction"
export default {
  data(){
    return{
      appId:null,
      brokerNo:null,

      cardInfo:{
        name:"",
        code:"",
        email:"",
        mobile:"",
        postName:"",
        companyName:"",
        portraitURL:"/card/static/img/tx.png",
        jobNameOne:"",
        jobNameTwo:"",
        jobNameThree:"",
        personalIntro:"一日托付，一心呵护",
      }
      
    }
  },
  created:function(){
    // this.htmd();
    this.appId = splitUrl()['appId'];
    
    if(this.appId){
      this.getInfo();
    }else{
      this.brokerNo = splitUrl()['brokerNo'];
      let brokerNoArr = this.brokerNo.split('==');
      this.brokerNo = brokerNoArr[0]+'==';
      this.getInfoShare();
    }
  },
  methods:{
    // htmd(){
    //   var ua = navigator.userAgent.toLowerCase();
  
    //   if( window.location.href.indexOf('appId') != -1){
    //       //app里时先不统计
    //     //window._htmd('3', '2');
    //   }
    //   else if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //     //是微信浏览器
    //     window._htmd('4', '2');
    //   }
    //   else{
    //     window._htmd('2', '2');
    //   }  
    // },
    // 复制成功邮箱
    onCopyEmail(e){
      tipAction("复制成功");
    },
    // 复制失败邮箱
    onErrorEmail(e){
      alert("失败");
    },
    // 复制成功公司名称
    onCopyName(e){
      tipAction("复制成功");
    },
    // 复制失败公司名称
    onErrorName(e){
      alert("失败");
    },
    getInfoShare(){
      this.$axiosHttp.http({
        method:"get",
        params:{
          empNo:this.brokerNo
        },
        url: apiUrl.getBusinessCardApi
      }, (res) => {
        this.cardInfo = res.data.data;
        if(res.data.data.portraitURL == null || res.data.data.portraitURL== ""){
          this.cardInfo.portraitURL = '/card/static/img/tx.png';
        }
        if(res.data.data.personalIntro == null || res.data.data.personalIntro== ""){
          this.cardInfo.personalIntro = '一日托付，一心呵护';
        }
        document.title = this.cardInfo.name+"("+this.cardInfo.postName+")";
      }, res => {
          
      })
      
    },
    getInfo(){
      this.$axiosHttp.http({
        method:"get",
        url: apiUrl.getBusinessCardApi
      }, (res) => {
        this.cardInfo = res.data.data;
        if(res.data.data.portraitURL == null || res.data.data.portraitURL== ""){
          this.cardInfo.portraitURL = '/card/static/img/tx.png';
        }
        if(res.data.data.personalIntro == null || res.data.data.personalIntro== ""){
          this.cardInfo.personalIntro = '一日托付，一心呵护';
        }
      }, res => {
          
      })
    },
    toShare(){
      if(this.appId){
           window.jsObj.toShare();   
      }else{
         $.elasticLayerTypeTwo({
              id: "tip",
              title: '提示',
              p: '<p>'+'请点击右上角分享'+'</p>',
              buttonTxt: '确认',
              zIndex: 100,
              callback: function (t) {
                  t.hide();
              }
        });
      }
    }
  }
}
</script>

