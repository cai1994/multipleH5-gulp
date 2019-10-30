<!-- /**
 * 表单-弹层-搜索
 * @author  huarunsong 2019-02-21
 *
 * 使用键盘上的搜索按钮触发搜索事件，非实时搜索
 *
 * 父组件需要有searchCallback方法，用来做搜索后选择的回调函数
 */
 列表搜索 -->
<template>
  <section class="searchListSection">
        <!-- 侧滑遮罩 -->
        <div :class="[leftbarShade ? 'cover-bar cover-barshow' : 'cover-bar']" @click.stop="close()"  @touchmove.prevent>
        </div>
        <!-- 侧滑遮罩 -->
        <!-- 侧滑主体 -->
        <div :class="[leftbarShade ? 'touch-bar touch-barshow' : 'touch-bar']">
            <search-topbar @closeSearchBar="close($event)" @changeSearchValue="changeSearchValue" @clearSearchBar="clearSearchBar"></search-topbar>
            <section class="dialogBox dialogBoxFA">
                <section class="dialog_con">
                    <section class="dialog_list_wrapper">
                        <ul class="dialog_list itemList" >
                            <template v-if="type=='cusflag'">
                                <li v-for="item in dataList" @tap.stop="select(item, $event)" >
                                    <span class="line_span" v-if="item.customerId">{{item.customerId}}</span>
                                    <span v-if="item.customerName">{{item.customerName}}</span>
                                </li>
                            </template>
                            <template v-else-if="type=='zcpzCus'">
                                <li v-for="item in dataList" @tap.stop="select(item, $event)">
                                    <span class="line_span" v-if="item.custNo">{{item.customerId}}</span>
                                    <span v-if="item.customerName">{{item.customerName}}</span>
                                </li>
                            </template>
                             <template v-else>
                                 <li v-for="item in dataList" @tap.stop="select(item)">
                                    <span class="line_span" v-if="item.code">{{item.code}}</span>
                                    <span v-if="item.name">{{item.name}}</span>
                                </li>
                            </template>
                        </ul>
                        <no-data :showNoData="showNoData" :noPage="noPage" :show="show"></no-data>
                    </section>
                    
                </section>
            </section>
        </div>
  </section>
</template>

<script>
import './searchList.less';

import searchTopbar from '@src/common/searchTopBar_13/searchTopBar'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

import noData from '@src/common/noData/noData'

export default {
    name: 'searchList',
    components:{
        searchTopbar,
        noData
    },
    props:
    {
      httpUrl:String,//接口地址
      type:String, //引用来源
      //empNo:String //陪谈理顾
    },
    data () {
      return {
            leftbarShade:false,//控制弹层显示与隐藏
            dataList:[],
            showNoData:false,//控制暂无数据显示与隐藏
            noPage: 'noPage',
            show: 'show'
      }
    },
    //created(){
       // $('body').height('auto');
       // //获取屏幕高度并设置到body上
       // $('body').attr('height', document.documentElement.clientHeight);
    //},
    methods: {  
        //打开弹层
        open( $el ){

            if( $el ){
                $( $el ).show();
            }
            else{
                $('.searchListSection').show();
            }
            
            this.leftbarShade = true;
            //设置body高度
            //$('body').height( $('body').attr('height') ? Number( $('body').attr('height')) : 'auto' );


            //$('.searchListSection').height( document.documentElement.clientHeight );
            //$('.searchListSection .touch-bar').height( document.documentElement.clientHeight * 0.8);
        },
        //关闭弹层
        close(){
            //alert( 1 );
            //var el = event.currentTarget;
            this.leftbarShade = false;
            this.dataList = [];

            this.showNoData = false;

            $(".mui-input-clear").val("");

            //$('body').height('auto');

            $('.searchListSection').hide();
            $('.touch-bar input').blur();

        },
        //实时搜索
        changeSearchValue(val){

            //此处加val.length的判断，否则安卓手机不按val为空执行
            if(val && val.length){
                this.getListData(val);
            }
            else{
                this.dataList = [];
            }
        },
        
        //清楚搜索条件
        clearSearchBar(){
            this.dataList = [];
            this.showNoData = false;
        },
       
        //获取列表数据
        getListData(val){
            
            if (this.type == 'zcpzCus') {
                var params={customerName:val};
            }

            else{
                var params={code:val};   
            }

            if(this.type == 'cusflag'){
                if(!this.empNo){
                    tipAction('请选择陪谈理顾！');
                    return;
                }
                else{
                    Object.assign(params,{empCode:this.empNo})
                }
            }

            this.$axiosHttp.http({
                    url: this.httpUrl,
                    needFailCallback: true,
                    params: params //搜索条件
                       
            }, (res) => {
                
                this.dataList = res.data.data;
                if(this.dataList.length){
                     this.showNoData = false;
                }
            }, res => {
                   this.dataList = [];
                   this.showNoData = true;
            })
        },

        //选中列表条目
        select(item, $event) {
            
            var that = this;

             if(this.type == 'empflag'){
                 this.$emit('selectEmp',item);
             }
             else if(this.type == 'cusflag'){
                 this.$emit('selectCus',item);
             }
             else if(this.type == 'areaflag'){
                 this.$emit('selectArea',item); 
             }
             else{
                //触发父组件的searchCallback方法
                //item是接口返回的数组中对应的这一条数据
                this.$emit('searchCallback', item);
             }

            setTimeout( function(){
                that.close()
            }, 500)
             
        }
    }  

}
</script>

