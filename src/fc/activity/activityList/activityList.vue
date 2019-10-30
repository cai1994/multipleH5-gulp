 <template>
    <section class="page">
        <div class="listWrap">
            
        </div>
        <!-- 待提交/未确认/已确认弹层模板 -->
        <template >
              <ul class="tableList" id="tableList" v-show="false">
                <li class="topBottomDivide dataList" v-for="data in listData" :data-id="data.id">
                    <div class="timeItem" v-if="tabIndex==1&&data.submitTime">{{$utils.momentFmtYmdh(data.submitTime)}} 提交</div>
                    <div class="timeItem" v-if="tabIndex==2&&data.updateTime">{{$utils.momentFmtYmdh(data.updateTime)}} 确认</div>
                    <div class="contentItem title">
                        <div class="a">
                            <span>{{data.activityName}}</span>
                        </div>
                        <div class="c">
                            <span class="fl">所属区域：</span>
                            <label class="fl">{{data.trainingAreaName}}</label>
                        </div>
                        <div class="c">
                            <span class="fl">举办时间：</span>
                            <label class="fl">{{data.holdTime}}</label>
                        </div>
                        <div class="c">
                            <span class="fl">举办地点：</span>
                            <label class="fl">{{data.holdPlace}}</label>
                        </div>
                        <div class="d"  v-if="tabIndex==0">
                            <a class="submit" :data-id="data.id">提交区域确认</a>
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

<script>
import "./activityList.less";

import tableList from '../../common/tableList/tableList.js'

//import noData from '@src/common/noData/noData'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "activityList",
    mixins: [tableList],
    components:{
        //noData,
    },
    data() {
        return {
            showNoData:false,
            tabList: [{name: '待提交'},{name: '未确认'},{name: '已确认'}], //导航
            tabIndex:0
        };
    },
    created() {

        //点击提交区域确认
         $('body').on('tap','.submit',(event)=>{

            let id = $(event.currentTarget).attr('data-id');

            this.submitArea(id);

        })

        //点击提交列表块查看详情
        $('body').on('tap','.dataList',(event)=>{
          
            if(!$(event.target).hasClass('submit')){
                
                let id = $(event.currentTarget).attr('data-id');

                this.gotoDetail(id);

            }
        })

        //配置接口参数
        this.httpUrl = apiUrl.selectTrainingListApi;
        this.httpData = {};

    },
    methods: {
        
        //提交区域确认
        submitArea(id) {

            

            $.elasticLayer({
                p: '是否确定要提交区域确认？',
                yesCel: '取消',
                yesTxt: '确定', 
                zIndex: 250,
                callbackCel: (t) => {
                    //点击取消后关闭
                    t.hide();
                },
                callback: (t) => {
                    //点击确定后关闭刷新列表
                    this.submitTrainingById(id);
                    t.hide();


                }
            })
        },

        //提交区域确认请求
        submitTrainingById(id){

            var _this = this;

            this.$axiosHttp.http({
                    name:'提交区域确认',
                    url: apiUrl.submitTrainingByIdApi,
                    needFailCallback:false,
                    params: {id:id}
            }, (res) => {

                tipAction(res.data.message, function(){
                    //重置当前上拉列表
                     _this.muiPullUpArr[0].dataDeal(3);
                });

            })

        },

        //查看详情
        gotoDetail(id) {
           window.location.href = goUrl.activityDetailUrl + '?id=' + id + '&status=' + this.tabIndex + "&flag=fc";
        }

    }
};
</script>
