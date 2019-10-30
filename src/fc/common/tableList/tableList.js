// 使用场景
// fc
// 任务与目标管理里的任务列表



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
            showLoading:false,
            muiTabScroll: muiTabScroll,
            muiPullUp: muiPullUp,
            muiPullUpArr: [],
            listData: [],
            tabList: [], //导航
            tabIndex:0,//tab点击索引
            httpUrl:{},
            httpData:{}
            
        };
    },
    mounted () {
        
        //初始化mui
        this.tabScroll();
        //显示加载提示
        this.showLoading = true; 
      
    },
    methods: {
        //初始化Mui上拉加载
        tabScroll(){
            
            var that = this;

            var obj = {
                wrapper: $('.listWrap'), //存放整个组件的区域
                needNavAction: false,
                //needBlock: true,
                navList: that.tabList, //导航
                //contentLength: that.tabList.length,  //左右滑动的区域个数，即导航数组长度
                //contentList: '', //此时只有框架，实际列表内容还未请求
                callback: function(t){
                    //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
                    //data-scroll属性即当前左右切换区域的索引--t.attr('data-scroll')
                    
                    //that.setting.current_index = t.attr('data-scroll');


                    //如果当前区域没有初始化上拉加载
                    if( !$('#scroll'+ (Number(t.attr('data-scroll')) + 1)).hasClass('hasPullUp')){

                        that.muiPullUpArr[t.attr('data-scroll')] = that.muiPullUp(t, function(){
                            //上拉加载的回调函数
                            that.getData( t );
                        });
                    }
                }
            }
            this.muiTabScroll(obj);
        },
         //请求列表数据
        getData( $tab ){
            let that = this,
                index =  $tab.attr('data-scroll'), //当前上拉区域对应的tab的index
                pageList = 10; //当前上拉区域默认一次10条

            this.tabIndex = index;

            let setting = Object.assign({
                    pageNum: Number($tab.find('.mui-scroll').attr('pageNum')) + 1, //起始页
                    pageSize: pageList,
                    status:index
            },this.httpData);

            that.$axiosHttp.http({
                url: this.httpUrl,
                needFailCallback:true,
                name:'查询列表',
                params: setting
            }, (res) => {
                //隐藏加载提示
                this.showLoading = false;

                that.listData = res.data.data; 

                //渲染模板
                if( that.listData.length ){
                    //有数据，渲染
                    
                    //隐藏暂无数据
                    //this.showNoData = false;
                    $('#scroll' + (Number(index) + 1)).find('.noDataInfo').hide();
                    $('#scroll' + (Number(index) + 1)).find('.mui-scroll').show();

                    this.$nextTick(()=>{

                        $('#move_'+index+' .tableList .mui-pull-bottom-pocket').before($('#tableList').clone().find('li') );
                    
                    });
                       

                    if( that.listData.length < pageList){
                        //已不够10条
                        that.muiPullUpArr[index].dataDeal(2);
                    }
                    else{
                        //够10条，还可以继续上拉
                        that.muiPullUpArr[index].dataDeal(0);
                    }
                }
            }, res => {
                
                that.listData = [];

                //隐藏加载提示
                this.showLoading = false;

                //显示暂无数据
                //this.showNoData = true;
                $('#scroll' + (Number(index) + 1)).find('.noDataInfo').show();
                $('#scroll' + (Number(index) + 1)).find('.mui-scroll').hide();

                //接口失败，调用dataDeal方法，做失败处理
                that.muiPullUpArr[index].dataDeal(1);
               
            })


        },




    }
}

export default listPageMixin;
