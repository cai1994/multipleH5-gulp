
import func from './vue-temp/vue-editor-bridge';

<!-- tab切换内容保障计划 -->
<template>
    <div id="one" >
        <div class="borderRadios">    
            <div class="row">
                <div class="rowLeft">发行规模</div>
                <div class="rowRight">{{$utils.comdify(insurePlan.issuanceLevel)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">币种</div>
                <div class="rowRight">{{currencyTypeShift(insurePlan.currencyType)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">上架时间</div>
                <div class="rowRight">{{$utils.momentFmtYmdhs(insurePlan.upDates)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">下架时间</div>
                <div class="rowRight">{{$utils.momentFmtYmdhs(insurePlan.downDate)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">项目期限</div>
                <div class="rowRight">{{insurePlan.investTerm}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">产品风险等级</div>
                <div class="rowRight">{{riskRatingShift(insurePlan.riskRating)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">投资方向</div>
                <div class="rowRight">{{inverstDirectShift(insurePlan.inverstDirect)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">收益分配方式</div>
                <div class="rowRight">{{incomeDistributWayShift(insurePlan.incomeDistributWay)}}</div>
            </div>
            
        </div>
        <div class="borderRadios" v-if="insurePlan.expectedReturns.length == 0">
            <div class="row">
                  <div class="rowLeft">业绩比较基准</div>
                <div class="rowRight"><span class="commission">无业绩基准</span></div>
            </div>
        </div>
         <div class="borderRadios" v-else>
            <ul class="mui-table-view mui-table-viewOnly"> 
                <li class="mui-table-view-cell mui-collapse mui-table-view-cellonly">
                    <a class="mui-navigate-right" href="#"><span>业绩比较基准</span></a>
                    <div class="mui-collapse-content">
                        <ul>
                            <li v-for="item in insurePlan.expectedReturns">
                                <!-- <p>{{item.incomeLevelName}}</p> -->
                                <div class="contentBox">
                                    <p>{{item.incomeLevelName}}</p>
                                    <div class="contentItem">
                                        <label v-if="insurePlan.currencyType == '0'">金额区间(万美元)：</label>
                                        <label v-if="insurePlan.currencyType == '1'">金额区间(万港币)：</label>
                                        <label v-if="insurePlan.currencyType == '2'">金额区间(万元)：</label>
                                        <span>{{item.amountLower}}-{{item.amountUpper}}</span>
                                    </div>
                                    <div class="contentItem">
                                        <label>预期收益率(%)：</label>
                                        <span>{{item.expectedReturns}}</span>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>   
        <div class="borderRadios" v-if="insurePlan.callPayment=='1'">   
            <div class="row">
                <div class="rowLeft">call款制</div>
                <div class="rowRight">一次性付清</div>
            </div>  
        </div>        
        <div class="borderRadios" v-else>
            <ul class="mui-table-view"> 
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right"><span>call款制</span><span class="selectHeadRight">call款制</span></a>
                    <div class="mui-collapse-content" v-if="insurePlan.callProportion">
                        <p>
                            <span>第1次缴款</span>
                            <span class="selectRight">{{insurePlan.callProportion[0]}}%</span>
                        </p>
                        <div v-for="(item,index) in insurePlan.callTime">
                            <p>
                                <span>第{{index+2}}次缴款</span>
                                <span class="selectRight">{{insurePlan.callProportion[index+1]}}%</span>
                            </p>
                            <p>
                                <span>第{{index+2}}次缴款起始时间</span>
                                <span class="selectRight">{{insurePlan.callTime[index]}}</span>
                            </p>
                        </div>

                        <div class="callRemark ">
                            <div class="rowLeft titleMessage">call款制备注: {{insurePlan.callPaymentRemark}}</div>
                            <!-- <div class="rowLeft titleMessage"><span class="iconfont messageColor ">&#xe6f6;</span>call款制备注:{{insurePlan.callPaymentRemark}}</div> -->
                            <!-- <div class="rowLeft messageContent">{{insurePlan.callPaymentRemark}}</div> -->
                        </div>
                    </div>
                    
                </li>
                
            </ul>
            
        </div>
        <!-- <div class="borderRadios">
                    <div class="rowLeft titleMessage"><span class="iconfont messageColor ">&#xe6f6;</span>call款制备注</div>
                    <div class="rowLeft messageContent">{{insurePlan.callPaymentRemark}}</div>
         </div> -->
        <div class="borderRadios" >
            <div class="row">
                <div class="rowLeft">产品资料</div>
                <div class="rowRight iconfont" @click="toProductInformationPage">{{insurePlan.productFileNum}} &#xe606;</div>
            </div>
            <div class="row">
                <div class="rowLeft">其他</div>
                <div class="rowRight iconfont" @click="toOtherPage">{{insurePlan.otherFileNum}}&#xe606;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'one',
    props:{
        insurePlan:Object,
    },
    filters:{
        //时间过滤器
        date(time){
        let date   = new Date(time)//把定义的时间赋值进来进行下面的转换
        let year   = date.getFullYear();
        let month  = date.getMonth()+1;
        let day    = date.getDate();
        let hour   = date.getHours(); 
        let minute = date.getMinutes(); 
        let second = date.getSeconds(); 
        return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      }
    },
    methods:{
        //跳转产品详情页面
        toProductInformationPage(){
              window.location.href="../../file/fileList/fileList.html?type=0&projectId="+splitUrl()['projectId']  
        },
        //跳转其他页面
        toOtherPage(){
              window.location.href="../../file/fileList/fileList.html?type=1&projectId="+splitUrl()['projectId']  

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
        //投资方向
        inverstDirectShift(num){
            switch(num){
                case "7":return '债券投资'
                case "9":return '股权投资'
                case "14":return '证券投资'
                case "15":return '海外公募'
            }
        },
        //货币转换
        currencyTypeShift(num){
            switch(num){
                case "0":return '美元'
                case "1":return '港币'
                case "2":return '人民币'
            }
        },
        //收益分配方式转换
        incomeDistributWayShift(num){
            switch(num){
                case "0":return '固定收益'
                case "1":return '固定、浮动收益'
                case "2":return '浮动收益'
            }
        }

        
    },

}
</script>


<style lang="less">
    @import './tab.less';
    
</style>