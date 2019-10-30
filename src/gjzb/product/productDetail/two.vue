

<!-- tab切换内容投保须知 -->
<template>
    <!-- <div id="one" v-html="insurePlan.insureKnow">
    </div> -->
     <div id="one" >
        <div class="borderRadios">    
            <div class="row">
                <div class="rowLeft">认购费率</div>
                <div class="rowRight" v-if="insurePlan.subscribe">{{insurePlan.subscribe}}%</div>
                <div class="rowRight" v-else>0.00%</div>
            </div>
            <div class="row">
                <div class="rowLeft">业绩折算系数</div>
                <div class="rowRight">{{insurePlan.achieveConverRate}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">津贴系数</div>
                <div class="rowRight">{{insurePlan.subsidyCoefficient}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">募集控制模式</div>
                <div class="rowRight" v-if="insurePlan.controlModel==0">发行规模</div>
                <div class="rowRight" v-if="insurePlan.controlModel==1">客户数</div>
            </div>
            <div class="row">
                <div class="rowLeft">个人投资起点</div>
                <div class="rowRight">{{insurePlan.perInvestStart}}{{currencyTypeShift(insurePlan.currencyType)}}</div>
            </div>
            <div class="row">
                <div class="rowLeft">预约金额倍数</div>
                <div class="rowRight">{{insurePlan.amountMultiplier}}</div>
            </div>
            
        </div>
        <div class="borderRadios" v-if="insurePlan.percentages.length == 0">
            <div class="row">
                  <div class="rowLeft">提成比例</div>
                <div class="rowRight"><span class="commission">无提成比例</span></div>
            </div>
        </div>
        <div class="borderRadios" v-else>
            <ul class="mui-table-view mui-table-viewOnly"> 
                <li class="mui-table-view-cell mui-collapse mui-table-view-cellonly">
                    <a class="mui-navigate-right"><span>提成比例</span></a>
                    <div class="mui-collapse-content">
                        <ul>
                            <li v-for="item in insurePlan.percentages">
                                
                                <div class="contentBox">
                                    <p>{{item.percentageName}}</p>
                                    <div class="contentItem">
                                        <label>金额区间(万{{currencyTypeShift(insurePlan.currencyType)}})：</label>
                                        <span>{{item.amountLower}}-{{item.amountUpper}}</span>
                                    </div>
                                    <div class="contentItem">
                                        <label>点位：</label>
                                        <span>{{item.points}}</span>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>   
        <div class="borderRadios">
                <div class="rowLeft">
                    <p class="titleMessage">提成备注</p>
                    <p class="messageContent">{{insurePlan.commissionRemark}}</p>
                </div>
        </div>
        <div class="borderRadios">
                <div class="rowLeft borderBottom">
                    <p class="titleMessage">备注</p>
                    <p class="messageContent">{{insurePlan.remark}}</p>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'two',
    props:{
        insurePlan:Object,
    },
    methods:{
        //货币转换
        currencyTypeShift(num){
            switch(num){
                case "0":return '美元'
                case "1":return '港币'
                case "2":return '元'
            }
        },
    }
}
</script>