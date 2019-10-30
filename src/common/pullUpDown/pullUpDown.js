/*
 * @page: tab切换的列表的，上拉加载，下拉刷新
 * @Author: songxiaoyu
 * @Date:   2019-05-09 
 * @Last Modified by:   songxiaoyu
 * @description:
 *     任务与目标管理里的任务列表页面使用
 * 
 */

import { debug } from "util";

//mui左右滑动
import muiTabScroll from '@common/components/muiComponents/muiTabScroll/muiTabScroll.js'
//mui上拉加载，下拉刷新
import muiPullDown from '@common/components/muiComponents/muiPullDown/muiPullDown.js'

const listPageMixin = {
    data() {
        return {
            this_: this,
            showNoData: false,
            showLoading: false,
            muiTabScroll: muiTabScroll,
            muiPullDown: muiPullDown,
            muiPullUpArr: [],
            listData: [],
            tabList: [], //导航
            // tabIndex: 0, //tab点击索引
            httpUrl: {},
            httpData: {},
            activeList: 0, // 默认显示tab
            needNavAction: false, // 导航是否可以滑动
            dynamicTab: true, // 动态加载tabList
        };
    },
    mounted() {
        //初始化mui
        if (!this.dynamicTab) { // 不是动态导航，直接初始化，否则在业务代码里初始化tabscroll
            this.tabScroll();
        }
        //显示加载提示
        this.showLoading = true;
    },
    methods: {
        //初始化Mui上拉加载
        tabScroll() {

            var that = this;

            var obj = {
                wrapper: $('.listWrap'), //存放整个组件的区域
                needNavAction: this.needNavAction,
                dynamicTab: this.dynamicTab, // 动态加载tabList
                // needBlock: true,
                activeList: this.activeList, // 默认第几个tab
                navList: that.tabList, //导航
                //contentLength: that.tabList.length,  //左右滑动的区域个数，即导航数组长度
                //contentList: '', //此时只有框架，实际列表内容还未请求
                callback: function(t) {
                    that.tabIndex = t.attr('data-scroll');

                    //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
                    //data-scroll属性即当前左右切换区域的索引--t.attr('data-scroll')

                    //如果当前区域没有初始化上拉加载
                    if (!$('#scroll' + (Number(t.attr('data-scroll')) + 1)).hasClass('hasPullUp')) {

                        that.muiPullUpArr[t.attr('data-scroll')] = that.muiPullDown(t, function(dom, type) {
                            //上拉加载的回调函数
                            that.getData(t, type);
                        });
                    }
                }
            }
            this.muiTabScroll(obj);
        },
        //请求列表数据
        getData($tab, type) {
            let that = this,
                index = $tab.attr('data-scroll'), //当前上拉区域对应的tab的index
                pageList = 10; //当前上拉区域默认一次10条

            this.tabIndex = index;

            for (var i = 0; i < this.httpConfig.length; i++) { // 将配置的参数传给httpData
                let m = this.httpConfig[i].key;
                let n = this.httpConfig[i].val;
                this.httpData[m] = n;
            }

            let setting = Object.assign({
                pageStart: Number($tab.find('.mui-scroll').attr('pageNum')) + 1, //起始页
                pageSize: pageList,
            }, this.httpData);

            that.$axiosHttp.http({
                url: this.httpUrl,
                needFailCallback: true,
                name: '查询列表',
                params: setting
            }, (res) => {
                //隐藏加载提示
                this.showLoading = false;


                if (this.httpReturnParam) { // 为了兼容任务排名列表，返回是对象里面的数组
                    that.httpReturnData = res.data.data;
                    that.listData = res.data.data[this.httpReturnParam];
                    if(setting.pageStart == 1){
                        that.isConcat = true;  // 下拉刷新的时候要重置
                    } else{
                        that.isConcat = false;
                    }
                } else {
                    that.listData = res.data.data;
                }
                //渲染模板
                if (that.listData.length) {
                    //有数据，渲染

                    //隐藏暂无数据
                    //this.showNoData = false;
                    $('#scroll' + (Number(index) + 1)).find('.noDataInfo').hide();
                    $('#scroll' + (Number(index) + 1)).find('.mui-scroll').show();

                    this.$nextTick(() => {
                        
                        //如果是下拉的
                        if( type == 'down'){
                            //清空代码
                            $('#move_' + index + ' .tableList li').addClass('removeLi')
                        }

                        $('#move_' + index + ' .tableList .mui-pull-bottom-pocket').before($('#tableList').clone().find('li'));
                        
                        //如果是下拉的
                        if( type == 'down'){
                            //清空代码
                            $('#move_' + index + ' .tableList .removeLi').remove();
                        }
                    });

                    if (that.listData.length < pageList) {
                        //小于10条,请求结束
                        that.muiPullUpArr[index].dataDeal(2);
                    } else {
                        //大于10条，还可以继续上拉
                        that.muiPullUpArr[index].dataDeal(0);
                    }

                }
            }, res => {


                that.listData = [];

                if (res.data.pageNum > 1) { // 
                    //操作成功，数据为空，且不是第一页，不能显示暂无数据的图标
                    that.muiPullUpArr[index].dataDeal(2);

                } else {
                    //显示暂无数据
                    //this.showNoData = true;
                    $('#scroll' + (Number(index) + 1)).find('.noDataInfo').show();
                    $('#scroll' + (Number(index) + 1)).find('.mui-scroll').hide();

                    //接口失败，调用dataDeal方法，做失败处理
                    that.muiPullUpArr[index].dataDeal(1);

                }

                //隐藏加载提示
                this.showLoading = false;
            })
        },
    }
}

export default listPageMixin;
