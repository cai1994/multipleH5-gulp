<!-- 资产配置列表 -->

<template>
    <section class="page">
        
        <header class="filterWrapper filterWrapperExp">
          <div class="searchBox">
            <form action="javascript:return true;">
                <input  type="search" @keyup.13="enterClick" placeholder="搜索资产配置..." maxlength="50" class="search_input">
            </form>
          </div>
          <img class="search" src="/commonResources/common/img/search.png" />
          <!-- <a class="r filter" @click="goNewAsset()">新建</a> -->
        </header>

        <!-- 上拉加载区域 -->
        <div class="listWrap mui-slider-group">
            <div class="mui-scroll"></div>
        </div>

        <!-- 列表模板 -->
        <template >
            <ul class="tableList listTemp" id="tableList">
                <!-- id为当前一条的资产配置id 
                    isReportable表示当前是否可生产报告 
                    customerName为查看报告需要的接口入参（需要id和customerName）
                -->
                <li class="topBottomDivide dataList" v-for="data in listData" :id="data.id" :isReportable="data.isReportable" :customerName="data.customerName">
                    <div class="contentItem title">
                        <div class="a">
                            <span>{{data.customerName}}</span>
                            <span>更新于{{data.createTime}}</span>
                        </div>
                        <div class="a_a">
                            <div class="item">
                                <div class="des" v-if="data.lifeTermText">{{data.lifeTermText}}</div>
                                <div class="des" v-else>--</div>
                                <div class="content">家庭生命周期</div>
                            </div>
                            <div class="item">
                                <div class="des" v-if="data.canConfigAssetsToThousand">{{data.canConfigAssetsToThousand}}万元</div>
                                <div class="des" v-else>--</div>
                                <div class="content">可配置资产</div>
                            </div>
                            <div class="item">
                                <div class="des" v-if="data.riskTypeText">{{data.riskTypeText}}</div>
                                <div class="des" v-else>--</div>
                                <div class="content">风险等级</div>
                            </div>
                        </div>
                        <div class="a_b">
                            <div class="lookreport">查看报告</div>
                            <div class="rebuild">重新生成</div>
                        </div>
                    </div>
                </li>
            </ul>
            <bottom-fixedbutton @clickbottomFixedBtn="goNewAsset()" btnText="新建" ></bottom-fixedbutton>
        </template>

        <!-- loading -->
        <list-loading :showListLoading="showListLoading"></list-loading>

    </section>

</template>

<script>

import "./assetList.less";

//上拉加载
import muiPullDown from '@common/components/muiComponents/muiPullDown/muiPullDown'

//列表页加载数据使用的loading
import listLoading from '@common/components/vueComponents/loading/listLoading'

//黑条提示
import tipAction from "@common/components/otherComponents/tipAction/tipAction"

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

export default {
    name: "activityList",
    components:{
        //noData,
        listLoading,
        bottomFixedbutton,
    },
    data() {
        return {
            relative: 'relative',
            showListLoading: true,
            listData: [],
            //showNoData:false,//默认不展示暂无数据的图标 
            page: 1, //默认页码是1
            pageSize: 20, //默认每页20条
            //showLoading: true,
            muiPullDown: muiPullDown, 
            muiPullUpArr: [],
            lifeTermDic:[],
            riskTypeDic:[],

            //默认customerName为空，搜索时重设
            customerName: ''
        };
    },
    created() {
        var that = this;

        //请求字典接口
        this.getDic();

        //点击重新生成
        $('body').on('tap', '.listWrap .contentItem .rebuild', function(){
            //跳转到编辑资产配置页面，传当前的资产配置id
            that.goNewAsset('edit', $(this).parents('li').attr('id'));
        })

        //点击查看报告，绑定到li上
        $('body').on('tap', '.listWrap .dataList', function(e){

            var eTarget = $(e.target),
                $_this = $(this);

            if( !eTarget.hasClass('rebuild') ){

                //用isReportable判断当前是否可查看
                var isReportable = $_this.attr('isReportable');

                if( isReportable == '1'){ //可查看

                    //app拦截此链接去下载，assetConfigId和customerName是pdf下载接口需要的两个入参
                    window.location.href = apiUrl.downloadPdfReportApi+'?assetConfigId=' + $_this.attr('id') + '&customerName=' + encodeURI( $_this.attr('customerName') );
                }
                else{
                    //不可查看，黑条提示文案
                    tipAction( '请先填写客户信息和问卷，再查看报告' );
                    
                }
            }
        })
    },

    mounted(){
        var that = this;
        
        
    },

    methods: {
        //获取字典
        getDic(){
            var that = this;
            
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                needFailCallback: true,
                data: ["1001","1002"]
            }, (res) => {
                //this.showLoading = false;
               /* 1000是与否
                1001生命周期阶段
                1002客户风险承受能力
                1003资产分类
                1004资产类别
                1005项目类型
                1006细分策略
                1007家庭未来现金流稳定性*/

                this.lifeTermDic = res.data.data[1001];
                this.riskTypeDic = res.data.data[1002];

                //渲染上拉加载区域
                that.muiPullUpArr.push( that.muiPullDown($('.listWrap'), function() {
                    //上拉加载的回调函数
                    that.getData($('.listWrap'));

                }));

            }, res => {
               
               //渲染上拉加载区域
               that.muiPullUpArr.push( that.muiPullDown($('.listWrap'), function() {
                   //上拉加载的回调函数
                   that.getData($('.listWrap'));

               }));

            })

        },

        //获取列表数据
        getData( ){
            var that = this;

            //先重设一下页码
            that.page = Number($('#tableList_1').attr('pageNum')) + 1;

            let setting = {
                pageNum: that.page, //起始页
                pageSize: that.pageSize,
                customerName: that.customerName
            };

            if( that.page == 1){
                //请求的是第一页的数据
                //请求之前，如果是第一页展示loading
                that.showListLoading = true;
                //隐藏暂无数据的图标
                //that.showNoData = false;
                $('.listWrap').find('.noDataInfo').hide();
                $('.listWrap').find('.mui-scroll').show();
            }

            that.$axiosHttp.http({
                url: apiUrl.getCustomerAssetConfigListApi,
                needFailCallback: true,
                name: '查询列表',
                params: setting
            }, (res) => {
                //隐藏加载提示
                
                //this.showLoading = false;

                if( res.data.data.length ){
                    //把字典值和正确文案对应起来
                    var data = res.data.data;

                    data.forEach((course, courseIndex, array) =>{

                        for (var i = 0; i < this.lifeTermDic.length; i++) {//资产分类
                            var obj =this.lifeTermDic[i];
                            if(obj.keyNo==course.lifeTerm){
                                this.$Vue.set(course, 'lifeTermText', obj.keyValue);
                            } 
                        }

                        for (var i = 0; i < this.riskTypeDic.length; i++) {//资产类别
                            var obj =this.riskTypeDic[i];
                            if(obj.keyNo==course.riskType){
                                this.$Vue.set(course, 'riskTypeText', obj.keyValue);
                            } 
                        }
                        this.$Vue.set(course, 'canConfigAssetsToThousand', this.$utils.toThousand(course.canConfigAssets));
                        this.$Vue.set(course, 'customerNames', course.customerName);
                        if (course.customerName.length>10) {
                            course.customerName=course.customerName.substr(0, 10)+"..."
                        }
                    })
                
                    that.listData = data;

                    //渲染模板
                    if (that.listData.length) {
                        //有数据，渲染

                        //隐藏暂无数据
                        //that.showNoData = false;
                        $('.listWrap').find('.noDataInfo').hide();
                        $('.listWrap').find('.mui-scroll').show();

                        that.$nextTick(() => {
                            if ($('#tableList > li').length > 0) {
                                $('.listWrap .tableList .mui-pull-bottom-pocket').before($('#tableList').clone().find('>li'));
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
                }

                that.showListLoading = false;
            }, (res, code) => {

                that.listData = [];
                //隐藏加载提示
                //this.showLoading = false;

                if( code == '1000' && that.page != 1){
                    //操作成功，数据为空，且不是第一页，不能显示暂无数据的图标
                    that.muiPullUpArr[0].dataDeal(2);
                }
                else{
                    //其他情况，都可显示暂无数据
                    //this.showNoData = true;
                    $('.listWrap').find('.noDataInfo').show();
                    $('.listWrap').find('.mui-scroll').hide();

                    //接口失败，调用dataDeal方法，做失败处理
                    that.muiPullUpArr[0].dataDeal(1);
                }  
                that.showListLoading = false;

            })
        },

        // 搜索
        enterClick(event){
            if (event.keyCode == 13) { //如果按的是enter键 13是enter 
                event.preventDefault(); //禁止默认事件（默认是换行）
                //获取用户输入的文字
                this.customerName = event.target.value;
                //重新渲染上拉加载
                this.muiPullUpArr[0].dataDeal(3); 
            }
        },

        //跳转到新建/编辑资产配置
        //type=edit时，是编辑，用传过去的资产配置id请求回显数据
        goNewAsset( type ,id ){

            var url = goUrl.addAssetUrl;

            if( type == 'edit' ){
                //编辑
                url += '?type=edit&id=' + id;
            }

            window.location.href = url;
        },
    }
};
</script>
