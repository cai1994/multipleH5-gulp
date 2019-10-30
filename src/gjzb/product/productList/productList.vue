<template>
  <section class="page">
    <header class="filterWrapper filterWrapperExp">
      <div class="searchBox">
        <form action="javascript:return true;">
            <input  type="search" @keyup.13="enterClick" placeholder="请输入产品关键词..." maxlength="100" class="search_input">
        </form>
      </div>
      <img class="search" src="/gjzb/common/img/search.png" />
      <a class="r filter" @click="slideOut">筛选<img src="/gjzb/common/img/filter.png" /></a>
    </header>
    <!-- 项目状态 -->
    <div class="projectStatus">
      <ul class="clearfix">
        <li v-for="(item,index) in proStatusData" @click="clickProStatus(item.type,index)" v-bind:class="{ active: defaultStatus==item.type }">{{item.value}}</li>
      </ul>
    </div>
    <!-- 项目状态 -->

    <div class="listWrap"></div>
    <!-- 待提交/未确认/已确认弹层模板 -->
    <template>
        <ul class="tableList tableItem"  id="tableList">
            <li v-for="(item,index) in listData" class="listItem"  :project-id="item.projectId" :currentNum="item.bespeakAmount" :total="item.issuanceLevel">
              <!-- 标题 -->
              <div class="left">
                  <p class="top icon">{{item.projectName}}</p>
              </div>
              <!-- 标题 -->
              <!-- 中间部分 -->
              <div class="bottom">
                <ul class="clearfix">
                  <li class="money">
                    <p class="top"><span class="number"><em>{{item.investStart}}</em></span></p> 
                    <p class="bottom" v-if="item.currencyType == 2">投资起点(万元)</p>
                    <p class="bottom" v-else>投资起点(万{{currencyTypeShift(item.currencyType)}})</p>
                  </li> 
                  <li class="date">
                    <p class="top"><span class="number"><em>{{item.projectTerm}}</em></span></p> 
                    <p class="bottom">项目期限({{investTermUnitShift(item.investTermUnit)}})</p>
                  </li> 
                  <li v-if="item.inverstDirect =='7'|| item.inverstDirect =='14'">
                    <p class="top"><span class="number" v-if="item.expectedReturnsMin && item.expectedReturnsMax">{{item.expectedReturnsMin}}%~{{item.expectedReturnsMax}}%</span></p>
                    <p class="bottom">业绩比较基准</p>
                  </li>
                  <li v-if="item.inverstDirect =='9'||item.inverstDirect =='15' ">
                    <p class="top"><span class="number">{{riskRatingShift(item.riskRating)}}</span></p>
                    <p class="bottom">产品风险等级</p>
                  </li>
                </ul>
              </div>
              <!-- 中间部分 -->
              <!-- 进度 -->
              <progress-tip :obj="{total:item.issuanceLevel,currentNum:item.bespeakAmount,index:index}"></progress-tip> 
              <!-- 进度 -->
                 
            </li>
        </ul>
    </template>
    <!-- 待提交/未确认/已确认弹层模板 -->

    <!-- <no-data :showNoData="showNoData" :relative="relative"></no-data> -->
    <!-- <loading :showLoading="showLoading"></loading> -->
    <list-loading :showListLoading="showListLoading"></list-loading>

    <!-- 侧滑遮罩 -->
    <div :class="[leftbarShade ? 'cover-bar cover-barshow' : 'cover-bar']" @click="close()"></div><!-- 侧滑遮罩 结束-->
    <!-- 侧滑主体 -->
    <div :class="[leftbarShade ? 'touch-bar touch-barshow' : 'cover-bar']">
        <div class="touch-barInner">
            <h2>收益分配方式</h2>
            <div class="filterItem syfpfs">
                <span v-for="item in incomeTypeData" @click="clickIncomeType(item.type)" v-bind:class="{ spanSelected: defaultType==item.type }"  >{{item.value}}</span>
            </div>
            <h2>投资期限</h2>
            <div class="filterItem tzqx">
                <span v-for="item in investTermData" @click="clickInvestTerm(item.type)" v-bind:class="{ spanSelected: defaultTerm==item.type }"  >{{item.value}}</span>
            </div>
            <h2>产品风险等级</h2>
            <div class="filterItem cpfxdj">
                <span v-for="item in riskLevelData" @click="clickRiskLevel(item.type)" v-bind:class="{ spanSelected: defaultRisk==item.type }"  >{{item.value}}</span>
            </div>
            <h2>推荐指数</h2>
            <div class="filterItem tjzs">
                <span v-for="item in starData" @click="clickStar(item.type)" v-bind:class="{ spanSelected: defaultstar==item.type }"  >{{item.value}}</span>
            </div>
        </div>
        <div class="bottomBtn">
            <a @click="closeBtn">确认</a>
        </div>
    </div>

    <!-- 侧滑主体 结束 -->
  </section>

</template>

<script>
import tableList from '../../common/tableList/tableList.js'

//import noData from '@src/common/noData/noData'

//列表页加载数据使用的loading
import listLoading from '@common/components/vueComponents/loading/listLoading'

import progressTip from '@src/gjzb/common/components/progress/progress.vue'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"
export default {
  name: "customerList",
  mixins: [tableList],
  components:{
      //noData,
      progressTip,
      listLoading
  },
  data(){
    return{
      relative: 'relative',
      leftbarShade: false,
      showNoData:false,
      tabList: [{name: '债券投资'},{name: '股权投资'},{name: '证券投资'},{name: '海外公募'}], //导航
      tabIndex:0,//tab点击索引
      defaultType:"",
      defaultTerm:"",
      defaultRisk:"",
      defaultstar:"",
      defaultStatus:"2",
      beforeTab: 1, //默认当前选中的索引为发行产品的


      //默认为第一次请求的数据
      searchForm:{
        projectName:"",//项目名称
        inverstDirect: 7,//投资方向
        incomeDistributWay:"",//收益分配方式
        investTerm:"",//投资期限
        riskRating:"",//产品风险等级
        status:2,//项目状态
        closeOut:0,//是否收尾
        suggestScore:"",//推荐指数
        pageNum:1,
        pageSize:10
      },
      listData : [],
      //项目期限
      investTermData:[
        {
          type:"",
          value:"全部"
        },
        {
          type:"0",
          value:"7-12个月"
        },
        {
          type:"1",
          value:"13-24个月"
        },
        {
          type:"2",
          value:"24个月以上"
        },
      ],
      //收益类型
      incomeTypeData:[
        {
          type:"",
          value:"全部"
        },
        {
          type:"0",
          value:"固定收益"
        },
        {
          type:"2",
          value:"浮动收益"
        },
        {
          type:"1",
          value:"固+浮"
        },
      ],
      //风险等级
      riskLevelData:[
        {
          type:"",
          value:"全部"
        },
        {
          type:"5",
          value:"保守型"
        },
        {
          type:"4",
          value:"稳健型"
        },
        {
          type:"3",
          value:"平衡型"
        },
        {
          type:"2",
          value:"成长型"
        },
        {
          type:"1",
          value:"进取型"
        },
      ],
      //推荐指数
      starData:[
        {
          type:"",
          value:"全部"
        },
        {
          type:5,
          value:"五星"
        },
        {
          type:4,
          value:"四星"
        },
        {
          type:3,
          value:"三星"
        },
        {
          type:2,
          value:"二星"
        },
        {
          type:1,
          value:"一星"
        }
      ],
      proStatusData:[
        {
          type:1,
          value:"预热产品"
        },
        {
          type:2,
          value:"发行产品"
        },
        {
          type:3,
          value:"收尾产品"
        },
        {
          type:4,
          value:"售罄产品"
        },
      ]
    }
  },
  created() {
      //配置接口参数
      this.httpUrl = apiUrl.productListApi;
      //this.httpData = {};
      $('body').on('tap','.listItem',(event)=>{
          let id = $(event.currentTarget).attr('project-id');
          this.toDetail(id);

      })

      
  },
  mounted(){

    //兼容安卓手机键盘出现后把节点顶起来的情况
    $('body').height($('body')[0].clientHeight);

    //页面打开后先给befroreTab设一个初始值
    $('.mui-slider-group #move_0 .tableList').attr('beforeTab', 1);
  },

  methods:{
    slideOut(){
      this.leftbarShade = true;
    },
    close(){
      this.leftbarShade = false;
    },
    //点击确定
    closeBtn(){
      this.leftbarShade = false;
      //当前上拉区域的索引
      var index = $('.nav-wrapper .mui-control-item.mui-active').index();
      //发送新请求
      this.muiPullUpArr[index].dataDeal(3);
    },
    //选择收益分配方式
    clickIncomeType(type){
      if (this.defaultType == type) {
          this.defaultType = "";
          this.searchForm.incomeDistributWay = "";
      } else {
          this.defaultType = type;
          this.searchForm.incomeDistributWay = type;
      }
    },
    //选择项目期限
    clickInvestTerm(type){
      if (this.defaultTerm == type) {
          this.defaultTerm = "";
          this.searchForm.investTerm = "";
      } else {
          this.defaultTerm = type;
          this.searchForm.investTerm = type;
      }
    },
    //选择风险等级
    clickRiskLevel(type){
      if (this.defaultRisk == type) {
          this.defaultRisk = "";
          this.searchForm.riskRating = "";
      } else {
          this.defaultRisk = type;
          this.searchForm.riskRating = type;
      }
    },
    //选择推荐指数
    clickStar(type){
      if (this.defaultstar == type) {
          this.defaultstar = "";
          this.searchForm.suggestScore = "";
      } else {
          this.defaultstar = type;
          this.searchForm.suggestScore = type;
      }
    },
    //跳转详情
    toDetail(id){
      window.location.href = '/gjzb/product/productDetail/productDetail.html?projectId='+id;
    },
    //清空筛选条件
    clearChoice(){
      this.defaultType = "";
      this.defaultTerm = "";
      this.defaultRisk = "";
      this.defaultstar = "";
      this.searchForm.incomeDistributWay = "";
      this.searchForm.investTerm = "";
      this.searchForm.riskRating = "";
      this.searchForm.suggestScore = "";
    },
    //切换项目状态
    clickProStatus(type,index){

      //一切换就展示loading
      this.showListLoading = true;

      //隐藏暂无数据的图标
      //this.showNoData = false;
        $('#scroll1').find('.noDataInfo').hide();

      $('.mui-slider-group .tableList').attr('beforeTab', '');
      $('.mui-slider-group .mui-scroll').attr('pageNum', 0);

      //清空筛选条件
      this.clearChoice();
      this.defaultStatus = type;
      if(index == 0){
        this.searchForm.status = "1";
        this.searchForm.closeOut = 0;
      }else if(index == 1){
        this.searchForm.status = "2";
        this.searchForm.closeOut = 0;
      }else if(index == 2){
        this.searchForm.status = "2";
        this.searchForm.closeOut = 1;
      }else if(index == 3){
        this.searchForm.status = "3";
        this.searchForm.closeOut = 0;
      }

      //重置筛选弹层的表单数据
      this.searchForm.incomeDistributWay = '';
      //投资期限
      this.searchForm.investTerm = '';
      //产品风险等级
      this.searchForm.riskRating = '';
      //推荐指数
      this.searchForm.suggestScore = '';


      //触发submit按钮的点击事件,模仿点击债券投资，先把第一屏的页码设置为0
      if( $('.nav-wrapper .mui-active').index() == 0 ){
        this.muiPullUpArr[0].dataDeal(3);
      }
      else{
           mui('#slider').slider().gotoItem(0);
      }
      
     
      //


      // for ( var i = 0; i < this.muiPullUpArr.length; i++){
      //   if( i == 0){
      //     this.muiPullUpArr[i].dataDeal(3);
      //   }
      //   else{
      //     //有可能中间的上拉区域没有初始化，需要跳过
      //     if( this.muiPullUpArr[i] ){
      //       this.muiPullUpArr[i].destroyObj( this.muiPullUpArr[i] );
      //       //this.muiPullUpArr[i] = undefined;
      //     }
          
      //   }
      // }
      
      
    },
    // 搜索
    enterClick(event){
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行）
         //获取用户输入的文字
        this.searchForm.projectName = event.target.value;
        //当前上拉区域的索引
        var index = $('.nav-wrapper .mui-control-item.mui-active').index();
        //重新发请求
        this.muiPullUpArr[index].dataDeal(3); 
      }

       
    },
    //项目期限单位转换
    investTermUnitShift(num){
      switch(num){
          case "0":return '天'
          case "1":return '月'
          case "2":return '年'
      }
    },
    //投资风险转换
    riskRatingShift(num){
        switch(num){
            case "1":return '进取型'
            case "2":return '成长型'
            case "3":return '平衡型'
            case "4":return '稳健型'
            case "5":return '保守型'
        }
    },
    //货币转换
    currencyTypeShift(num){
        switch(num){
            case 0:return '美元'
            case 1:return '港币'
            case 2:return '元'
        }
    },
  }
}
</script>

<style lang="less">
@import './productList.less';
@import '../../common/tableList/tableList.less';
</style>

