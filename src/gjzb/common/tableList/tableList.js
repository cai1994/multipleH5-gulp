import { debug } from "util";


//mui左右滑动
import muiTabScroll from '@common/components/muiComponents/muiTabScroll/muiTabScroll.js'
//mui上拉加载
import muiPullUp from '@common/components/muiComponents/muiPullUp/muiPullUp.js'

const listPageMixin = {
    data() {
        return {
            this_: this,
            //showNoData: false,
            //showLoading: false,
            showListLoading: true,
            muiTabScroll: muiTabScroll,
            muiPullUp: muiPullUp,
            muiPullUpArr: [],
            listData: [],
            tabList: [], //导航
            tabIndex: 0, //tab点击索引
            httpUrl: {},
            //httpData: {}

        };
    },
    mounted() {
        if (window.env != 4 && window.location.href.indexOf('eruda=true') != -1) {
            //非生产环境且url上eruda参数为true
            var script = document.createElement('script');
            script.src = "//cdn.jsdelivr.net/npm/eruda";
            document.body.appendChild(script);
            script.onload = function() { eruda.init() }
        }
        //初始化mui
        this.tabScroll();
        //显示加载提示
        //this.showLoading = false;

    },
    methods: {
        //初始化Mui区域切换
        tabScroll() {
            var that = this;

            var obj = {
                wrapper: $('.listWrap'), //存放整个组件的区域
                needNavAction: false,
                //needBlock: true,
                navList: that.tabList, //导航
                //contentLength: that.tabList.length,  //左右滑动的区域个数，即导航数组长度
                //contentList: '', //此时只有框架，实际列表内容还未请求
                callback: function(t) {
                    //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
                    //data-scroll属性即当前左右切换区域的索引--t.attr('data-scroll')

                    //如果当前区域没有初始化上拉加载
                    if (!$('#scroll' + (Number(t.attr('data-scroll')) + 1)).hasClass('hasPullUp')) {

                        that.muiPullUpArr[t.attr('data-scroll')] = that.muiPullUp(t, function() {
                            //上拉加载的回调函数
                            that.getData(t);
                            console.log('切换区域');
                            // setTimeout( function(){
                            //     $('#move_' + t.attr('data-scroll') + ' .tableList .mui-pull-bottom-pocket').before($('#tableList').clone().find('>li'));
                            // }, 1000)

                        });

                    } else {

                            
                        //防止0和''相等  需要用!==
                        var beforeTab = $('#scroll' + (Number(t.attr('data-scroll')) + 1)).find('.tableList').attr('beforeTab'),
                            index = $('.projectStatus .active').index();

                        if( (beforeTab === '') || ( beforeTab !== '' && Number(beforeTab) !== index ) ){

                        //if(  !== Number( $('#scroll' + (Number(t.attr('data-scroll')) + 1)).find('.tableList').attr('beforeTab')) ){
                            //不是当前项目状态了，需要重新请求
                            that.muiPullUpArr[t.attr('data-scroll')].dataDeal(3);
                            //保留最新状态
                            that.beforeTab = $('.projectStatus .active').index();
                        }
                        // else{
                        //     //切换tab判断是否显示暂无数据
                        //     if ($('#scroll' + (Number(t.attr('data-scroll')) + 1)).find('.tableList li').length > 0) {

                        //         that.showNoData = false;

                        //     } else {
                        //         that.showNoData = true;
                        //     }
                        // }
                    }

                    //给当前区域添加项目状态的标识
                    $('#scroll' + (Number(t.attr('data-scroll')) + 1)).find('.tableList').attr('beforeTab', $('.projectStatus .active').index())
                }
            }
            this.muiTabScroll(obj);
        },
        //请求列表数据
        getData($tab) {

            let that = this,
                index = $tab.attr('data-scroll'), //当前上拉区域对应的tab的index
                pageList = 10; //当前上拉区域默认一次10条

            if (index == 0) {
                //债券投资
                this.tabIndex = 7;
            } else if (index == 1) {
                //股权投资
                this.tabIndex = 9;
            } else if (index == 2) {
                //证券投资
                this.tabIndex = 14;
            } else if (index == 3) {
                //海外公募
                this.tabIndex = 15;
            }

            var pageNum = Number($tab.find('.mui-scroll').attr('pageNum')) + 1;

            if( pageNum == 1){
                //请求的是第一页的数据
                //请求之前，如果是第一页展示loading
                that.showListLoading = true;
                //隐藏暂无数据的图标
                //that.showNoData = false;
                
                $('#scroll' + (Number(index) + 1)).find('.noDataInfo').hide();
                $('#scroll' + (Number(index) + 1)).find('.mui-scroll').show();

                //请求之前，把列表区域回归到顶部并隐藏回到顶部的按钮
                // var tl = $('#scroll' + (Number(index) + 1)).find('.tableList');
                // tl[0].style.webkitTransform="translate3d(0px, 0px, 0px) translateZ(0px)";
                // tl[0].style.webkitTransform='2500ms';
                // tl.siblings('.goTopBtn').hide();
            }

        
            let setting = {
                pageNum: pageNum , //起始页
                pageSize: pageList,
                projectName: this.searchForm.projectName, //项目名称
                inverstDirect: this.tabIndex, //投资方向
                incomeDistributWay: this.searchForm.incomeDistributWay, //收益分配方式
                investTerm: this.searchForm.investTerm, //投资期限
                riskRating: this.searchForm.riskRating, //产品风险等级
                suggestScore: this.searchForm.suggestScore, //推荐指数
                closeOut: this.searchForm.closeOut,
                status: this.searchForm.status
            };

            that.$axiosHttp.http({
                url: this.httpUrl,
                needFailCallback: true,
                name: '查询列表',
                params: setting
            }, (res) => {
                //隐藏加载提示
                //this.showLoading = false;

                that.listData = res.data.data;

                //渲染模板
                if (that.listData.length) {
                    //有数据，渲染

                    //隐藏暂无数据
                    //this.showNoData = false;
                    $('#scroll' + (Number(index) + 1)).find('.noDataInfo').hide();
                    $('#scroll' + (Number(index) + 1)).find('.mui-scroll').show();

                    this.$nextTick(() => {
                        if ($('#tableList > li').length > 0) {
                            if (that.searchForm.status != 1) {

                                $('#tableList > li').find('.progressBox').siblings("label").show();
                                $('#tableList > li .progressBox').show();
                                $.each($('#tableList > li'), function(i, el) {
                                    //判断进度条有没有被初始化过
                                    var mp = mui($(el).find('.progressBox')[0]).progressbar(),
                                        proNum = Number($(el).attr('currentNum') / $(el).attr('total')) * 100;
                                    if( mp ){
                                        //有初始化，重置数据
                                        mp.setProgress(proNum);
                                    }   
                                    else{
                                        //没有被初始化，初始化进度条
                                        mui($(el).find('.progressBox')[0]).progressbar({ progress: proNum }).show();
                                    }
                                })

                            } else {
                                $('#tableList > li').find('.progressBox').hide();
                                $('#tableList > li').find('.progressBox').siblings("label").hide();
                            }

                            $('#move_' + index + ' .tableList .mui-pull-bottom-pocket').before($('#tableList').clone().find('>li'));

                            //$('.nav-wrapper .mui-active').attr('beforeTab', $('.projectStatus .active').index());

                            //$('.tab-scroll-action .mui-active')
                            //mui("#demo1").progressbar({ progress: 20 }).show();
                        }

                    });


                    if (that.listData.length < pageList) {
                        //已不够10条
                        that.muiPullUpArr[index].dataDeal(2);
                    } else {
                        //够10条，还可以继续上拉
                        that.muiPullUpArr[index].dataDeal(0);
                    }
                }
                that.showListLoading = false;
            }, (res, code) => {

                that.listData = [];
                //隐藏加载提示
                //this.showLoading = false;

                if( code == '1000' && pageNum != 1){
                    //操作成功，数据为空，且不是第一页，不能显示暂无数据的图标
                    that.muiPullUpArr[index].dataDeal(2);
                }
                else{
                    //其他情况，都可显示暂无数据
                    //this.showNoData = true;
                    $('#scroll' + (Number(index) + 1)).find('.noDataInfo').show();
                    $('#scroll' + (Number(index) + 1)).find('.mui-scroll').hide();

                    //接口失败，调用dataDeal方法，做失败处理
                    that.muiPullUpArr[index].dataDeal(1);
                }  

                that.showListLoading = false;

            })


        },




    }
}

export default listPageMixin;