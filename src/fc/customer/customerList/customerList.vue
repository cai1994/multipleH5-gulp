 <template>
    <section class="page">

        <div class="listWrap">
            
        </div>

        <!-- 待提交/未确认/已确认弹层模板 -->
        <template v-if="listData.length">
            <ul class="tableList"  id="tableList" v-show="false">
                <li class="topBottomDivide dataList" v-for="data in listData" :data-id="data.id" >
                    <div class="timeItem" v-if="tabIndex==1&&data.submitTime">{{$utils.momentFmtYmdh(data.submitTime)}} 提交</div>
                    <div class="timeItem" v-if="tabIndex==2&&data.updateTime">{{$utils.momentFmtYmdh(data.updateTime)}} 确认</div>
                    <div class="contentItem">
                            <div class="a">
                                <span>{{data.empCode}}</span>
                                <span>{{data.empName}}</span>
                                <a>陪谈理顾</a>
                            </div>
                            <div class="b">
                                <span>{{data.custName}}</span>
                            </div>
                            <div class="c">
                                <span class="fl">拜访对象：</span>
                                <label class="fl">{{data.viewObject}}</label>
                                <span class="fl">拜访日期：</span>
                                <label class="fl">{{data.viewDate}}</label>
                            </div>
                            <div class="d" v-if="tabIndex==0">
                                <a class="submit" :data-id="data.id" >提交理顾确认</a>
                            </div>
                    </div>
                </li>
            </ul>
        </template>
        <!-- 待提交/未确认/已确认弹层模板 -->

        <!-- <no-data :showNoData="showNoData"></no-data> -->
        <loading :showLoading="showLoading"></loading>
        
    </section>

</template>

<script  type="text/javascript">

import "./customerList.less";

import tableList from '../../common/tableList/tableList.js'

//import noData from '@src/common/noData/noData'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "customerList",
    mixins: [tableList],
    components:{
        //noData
    },
    data() {
        return {
            showNoData:false,
            tabList: [{name: '待提交'},{name: '未确认'},{name: '已确认'}], //导航
            tabIndex:0,//tab点击索引
        };
    },
    created(){

        //点击提交理顾确认
        $('body').on('tap','.submit',(event)=>{

            let id = $(event.currentTarget).attr('data-id');

            this.submitToAdvisor(id);

        })

        //点击提交列表块查看详情
        $('body').on('tap','.dataList',(event)=>{
            if(!$(event.target).hasClass('submit')){

                let id = $(event.currentTarget).attr('data-id');

                this.gotoDetail(id);


            }
        })

        //配置接口参数
        this.httpUrl = apiUrl.selectCustInterviewListApi;
        this.httpData = {};

    },
    mounted () {
        
    },
    methods: {
        //提交理顾确认
        submitToAdvisor(id) {
            $.elasticLayer({
                p: '是否确定要提交理顾确认？',
                yesCel: '取消',
                yesTxt: '确定', 
                zIndex: 250,
                callbackCel: (t) => {
                    //点击取消后关闭
                    t.hide();
                },
                callback: (t) => {
                    //点击确定后关闭刷新列表
                    this.submitInterview(id);
                    t.hide();

                }
            })
          
        },

        //提交理顾确认请求
        submitInterview(id){

            var _this = this;
            
            this.$axiosHttp.http({
                    name:'提交理顾确认',
                    url: apiUrl.submitCustInterviewApi,
                    needFailCallback:false,
                    params: {id:id}
            }, (res) => {
            
              tipAction(res.data.message, function(){
                    //重置当前上拉列表
                     _this.muiPullUpArr[0].dataDeal(3);
                });


            }, res => {
                
            })

        },

        //查看详情
        gotoDetail(id) {
             window.location.href = goUrl.customerDetailUrl + '?id=' + id + '&status=' + this.tabIndex + "&flag=fc";
        }
        
    }
};
</script>
