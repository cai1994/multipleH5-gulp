 <template>
    <section class="page">
        
        <header class="filterWrapper filterWrapperExp">
          <div class="searchBox">
            <form action="javascript:return true;">
                <input  type="search" @keyup.13="enterClick" placeholder="搜索客户..." maxlength="50" class="search_input">
            </form>
          </div>
          <img class="search" src="/gjzb/common/img/search.png" />
          <a class="r filter" @click="goNewAsset('new')">新建</a>
        </header>

        <!-- 上拉加载区域 -->
        <div class="listWrap mui-slider-group">
            <div class="mui-scroll"></div>
        </div>

        <!-- <header class="assetHeader">
            <i class="iconfont icon-ziyuan">&#xe633;</i>
            <div class="searchWrap">
                <i class="iconfont">&#xe66f;</i>
                <input type="search" class="searchInput" name="" placeholder="搜索客户">
            </div>
            <span class="newBuild">新建</span>
        </header> -->

        <!-- 列表模板 -->
        <template >
            <!-- <p class="drop-down" v-if="dropDown">松手刷新数据...</p> -->
<!--             <scroll ref="wrapper" class="wrapper"
                :listenScroll="true"
                :data="list"
                :pulldown="pulldown"
                @pulldown="loadData" -->
                <ul class="tableList listTemp" id="tableList">
                    <li class="topBottomDivide dataList" v-for="data in listData" :data-id="data.id">
                        <div class="contentItem title">
                            <div class="a">
                                <span>{{data.customerName}}</span>
                                <span>更新于{{data.createTime}}</span>
                            </div>
                            <div class="a_a">
                                <div class="item">
                                    <div class="des">{{data.lifeTermText}}</div>
                                    <div class="content">家庭生命周期</div>
                                </div>
                                <div class="item">
                                    <div class="des">{{data.canConfigAssetsToThousand}}万元</div>
                                    <div class="content">可配置资产</div>
                                </div>
                                <div class="item">
                                    <div class="des">{{data.riskTypeText}}</div>
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
           <!--  </scroll> -->
        </template>

        <!-- 待提交/未确认/已确认弹层模板 -->
        <!-- <no-data :showNoData="showNoData" :relative="relative"></no-data> -->
        <list-loading :showListLoading="showListLoading"></list-loading>

        <!-- <loading :showLoading="showLoading"></loading> -->
    </section>

</template>

<script>
//import Vue from 'vue'; 

import "./assetList.less";

//上拉加载
import muiPullDown from '@common/components/muiComponents/muiPullDown/muiPullDown'

//暂无数据
//import noData from '@src/common/noData/noData'

//列表页加载数据使用的loading
import listLoading from '@common/components/vueComponents/loading/listLoading'

//黑条提示
import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "activityList",
    components:{
        //noData,
        listLoading
    },
    data() {
        return {
            relative: 'relative',
            showListLoading: true,
            listData: [],
            //showNoData:false,//默认不展示暂无数据的图标
            page: 1, //默认页码是1
            pageSize: 10, //默认每页10条
            //showLoading: true,
            muiPullDown: muiPullDown, 
            muiPullUpArr: [],
            lifeTermDic:[],
            riskTypeDic:[],
        };
    },
    created() {
        var that = this;

        //配置接口参数
        this.httpUrl = apiUrl.getCustomerAssetConfigListApi;
        this.getDic();
        //this.getUser();

        //点击重新生成
        $('body').on('tap', '.listWrap .contentItem .rebuild', function(){
            that.goNewAsset('edit', $(this).parents('li').attr('data-id'));
        })

        //点击查看报告，绑定到li上
        $('body').on('tap', '.listWrap .dataList', function(e){
            if( !$(e.target).hasClass('rebuild') ){
                that.readTxt($(this).attr('data-id'),$(this).index());
            }
            
        })
    },

    mounted(){
        var that = this;
        
        that.muiPullUpArr.push( that.muiPullDown($('.listWrap'), function() {
            //上拉加载的回调函数
            that.getData($('.listWrap'));

        }));
    },

    methods: {
        //获取字典
        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                needFailCallback:false,
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

                this.lifeTermDic=res.data.data[1001];
                this.riskTypeDic=res.data.data[1002];
            }, res => {
               //this.showLoading = false;
            })

        },


        //获取用户
        /*getUser(){
            let formData = new FormData();
            formData.append('customerName', '');
            this.$axiosHttp.http({
                name:'获取用户',
                url: apiUrl.searchCustomerListApi,
                needFailCallback:false,
                params: {
                    customerName:"",
                    pageNum:1,
                    pageSize:10,
                }
            }, (res) => {
                this.showLoading = false;
                var data = res.data.data[0];

                //保存客户customerName
               this.customerName = data.customerName;
               this.customerId = data.customerId;
               this.customerNo = data.custNo;
               this.customerSource = data.customerSource;
            }, res => {
               this.showLoading = false;
            })

        },*/

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

                //请求之前，把列表区域回归到顶部并隐藏回到顶部的按钮
                //var tl = $('.listWrap').find('.tableList');

                
                //mui.trigger(document.getElementById("goTopBtn"),'tap');

                // tl[0].style.webkitTransform="translate3d(0px, 0px, 0px) translateZ(0px)";
                // tl[0].style.webkitTransform='2500ms';
                // tl.siblings('.goTopBtn').hide();
            }

            that.$axiosHttp.http({
                url: that.httpUrl,
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
                //当前上拉区域的索引
                //var index = $('.nav-wrapper .mui-control-item.mui-active').index();
                //重新发请求
                //this.page = 1;
                this.muiPullUpArr[0].dataDeal(3); 
            }

           
        },

        //跳转到新建/编辑资产配置
        //编辑资产配置时，需要传参数客户编号、客户姓名、客户来源，用于请求编辑数据
        goNewAsset( type ,id ){

            var url = goUrl.newAssetInfoUrl;
            if( type == 'edit' ){
                //编辑
                url += '?type=edit';
                url += '&id='+id;
            }
            window.location.href = url;
        },

        //查看报告，需要拼接参数
        readTxt(id,index) {
            window.location.href = goUrl.recommendationUrl+'?assetConfigId='+id+'&type=recommend'+'&customerName='+this.listData[index].customerNames;
        }

    }
};
</script>
