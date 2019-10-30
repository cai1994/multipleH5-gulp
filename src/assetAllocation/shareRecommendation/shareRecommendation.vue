<template>
    <div class="recommendation">
        <div class="header">
            <img src="/assetAllocation/static/img/1.png">
        </div>
        <div class="mainCont">
            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>致客户<i class="iconfont righticon"></i>
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div class="sec-content">
                    <div class="padB10">尊敬的{{forwardData.detail.customerName}}先生/女士：</div>
                    <div class="indent2">呈现在您面前的是《恒天财富资产配置建议书》（以下简称《建议书》）。感谢您抽出宝贵的时间配合，我们承诺对您的信息严格保密。本《建议书》包含4部分内容：</div>
                    <div>1.宏观经济展望及大类资产投资建议：恒天财富研究院专家团队从宏观层面把握资本市场的总体变动趋势，判断资产的投资价值，从而为投资者提供在宏观背景下的大类资产配置建议。</div>
                    <div>2. 客户资产配置现状分析：通过对您及您家人的资产情况调研，全面分析解读您目前的投资状况。 </div>
                    <div>3. 投资者画像测评结果：从生命周期、资产量级、以及风险偏好这三个维度为您做投资者画像，根据您的选择推荐适合您的资产配置比例。 </div>
                    <div>4. 资产配置及产品建议：基于上述结果，为您定制详尽的优化投资方案，选择适合您的产品。当然，您也可以根据自身情况，调整您的资产配置组合。 </div>
                    <div class="indent2">我们相信通过这套科学的分析系统，可以帮助您优化投资的风险收益比，更加合理有效地管理您的财富。 </div>
                    <div class="indent2">我们建议您结合您的资产状况及市场变动情况，定期分析资产配置现状，动态掌握您的财富状况。</div>
                    <div class="indent2">如果您对《建议书》有任何问题或者有任何数据需要更新，欢迎您随时与恒天财富管理团队联系。我的电话是<span>{{forwardData.detail.phone}}</span>，电子邮件是<span>{{forwardData.detail.email}}</span>。 </div>
                    <div class="textR padT20">理财顾问：{{forwardData.detail.empName}}</div>
                    <div class="textR">报告日期：{{forwardData.detail.createTime}}</div>
                </div>
            </div>


            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>宏观经济展望及大类资产投资建议<i class="iconfont righticon"></i>
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div v-html="forwardData.investSuggest" class="ueditor"></div>
            </div>
            
            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>客户资产配置现状分析<i class="iconfont righticon"></i>
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div id="nowPie" class="myChart">暂无数据</div>
            </div>

            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>客户画像测评结果<i class="iconfont righticon"></i>
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div class="sec-content">
                    <div>维度一：资产量级</div>
                    <div class="indent2">恒天财富将投资者的资产量级分为500万元以下、500-1000万元、1000-3000万元、3000万-1亿元、1亿元以上。</div>
                    <div>您的资产量级为：<span>{{forwardData.detail.canConfigAssetsToThousand}}</span>万元；属于{{forwardData.detail.assetScope}}</div>
                    <div>维度二：生命周期</div>
                    <div class="indent2">恒天财富根据生命周期理论，将投资者的生命周期分为单身期、家庭形成期、家庭成长期、家庭成熟期和老年期。</div>
                    <div>您的生命周期处于：<span>{{forwardData.detail.lifeTermText}}</span></div>
                    <div>维度三：风险偏好</div>
                    <div class="indent2">恒天财富根据投资者的风险承受能力，将投资者分为保守型、稳健型、平衡型、成长型、进取型。</div>
                    <div>您的投资类型为：<span>{{forwardData.detail.riskTypeText}}</span></div>
                    <div class="">根据您的风险承受能力，建议您的资产配置如下：</div>
                    <div id="recommendPie" class="myChart">暂无数据</div>
                    <div class="">根据您的产品选择，建议您的产品配置如下：</div>
                </div>
                <ul class="dropDownList" ref="dropDownList">
                    <li class="item" v-for="(el1,index) in forwardData.recommendForwardProducts">
                        <div class="header" @click="changeStatus(el1)">
                            <p class="scale">
                                <span class="orangeline"></span>
                                <span class="orange size32 mar-l-20">{{el1.assetRecommendRatio}}%</span>
                                <span class="size30 cl-3c3c3c mar-l-20">{{el1.assetClassifyText}}</span>
                                <span class="size30 cl-999 mar-l-10">({{el1.assetTypeText}})</span>
                            </p>
                            <p class="money cl-666">配置金额：{{el1.assetRecommend}}元</p>
                            <i  :class="el1.isFold ? 'iconfont dropDownBtn up' : 'iconfont dropDownBtn down'"
                                :data-assetconfigid="el1.assetConfigId">
                            </i>
                        </div>
                        <div class="fold" v-show="el1.isFold">
                            <div class="foldItem" v-for="(item,itemIndex) in el1.productVOS">
                                <div class="title"><span class="size30 cl-3c3c3c">推荐</span><span class="cl-666"> {{item.productTypeText}}、{{item.subdivisionStrategyText}}</span></div>
                                <ul class="foldItemList">
                                    <li class="listItem" v-for="(listItem,listItemIndex) in item.products">
                                        <div class="productName">
                                            <i  :class="listItem.ischeck ? 'iconfont checkbox checked' : 'iconfont checkbox noCheck'" 
                                                :data-id="listItem.id">
                                            </i><span class="mar-l-28 cl-666">{{listItem.projectName}}</span>
                                        </div>
                                        <div class="productDetails cl-999">{{listItem.projectAbbreviation}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>          
                    </li>
                </ul>
            </div>
            
            
            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>客户资产配置调整建议<i class="iconfont righticon"></i>               
                </div>
                 <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div id="bar" class="myChart">暂无数据</div>
            </div>
           
            <div class="section">
                 <div class="sec-title">
                    <i class="iconfont lefticon"></i>资产配置及产品建议<i class="iconfont righticon"></i>               
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <ul class="dropDownList" ref="dropDownList">
                    <li class="item" v-for="(el2,index) in forwardData.allForwardProducts">
                        <div class="header" @click="changeStatus(el2)">
                            <p class="scale">
                                <span class="orangeline"></span>
                                <span class="orange size32 mar-l-20">{{el2.assetRecommendRatio}}%</span>
                                <span class="size30 cl-3c3c3c mar-l-20">{{el2.assetClassifyText}}</span>
                                <span class="size30 cl-999 mar-l-10">({{el2.assetTypeText}})</span>
                            </p>
                            <p class="money cl-666">配置金额：{{el2.assetRecommend}}元</p>
                            <i  :class="el2.isFold ? 'iconfont dropDownBtn up' : 'iconfont dropDownBtn down'"
                                :data-assetconfigid="el2.assetConfigId">
                            </i>
                        </div>
                        <div class="fold" v-show="el2.isFold">
                            <div class="foldItem" v-for="(item,itemIndex) in el2.productVOS">
                                <div class="title"><span class="size30 cl-3c3c3c">推荐</span><span class="cl-666"> {{item.productTypeText}}、 {{item.subdivisionStrategyText}}</span></div>
                                <ul class="foldItemList">
                                    <li class="listItem" v-for="(listItem,listItemIndex) in item.products">
                                        <div class="productName">
                                            <i  :class="listItem.ischeck ? 'iconfont checkbox checked' : 'iconfont checkbox noCheck'" 
                                                :data-id="listItem.id">
                                            </i><span class="mar-l-28 cl-666">{{listItem.projectName}}</span>
                                        </div>
                                        <div class="productDetails cl-999">{{listItem.projectAbbreviation}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>          
                    </li>
                </ul> 
            </div>


            <div class="section">
                <div class="sec-title">
                    <i class="iconfont lefticon"></i>免责声明<i class="iconfont righticon"></i>
                </div>
                <div class="line">
                    <span class="leftdot dot"></span>
                    <span class="dashed"></span>
                    <span class="rightdot dot"></span>
                </div>
                <div class="sec-content indent2">本报告内容仅供一般参考，不应被当作投资策略建议，也不构成针对任何证券或其它金融工具的邀约、推荐或建议。本文件只作一般评估，并未考虑任何特定人士或群体的具体投资目标、财务状况、特定需求等，亦非专为任何特定人士或群体编制。虽然本文所使用的信息来源可靠，但“恒天财富”并不保证其准确性和完整性，也不对使用本报告所包含的材料产生的任何直接或间接损失以及信息遗漏负责。本报告中涉及的投资性产品的过去绩效并不代表其未来表现，任何证券或其他金融工具均可能存在重大风险，可能不适用于所有投资者。本报告涉及的证券或金融工具的价格、价值以及收益会受到经济环境的影响而波动，报告中的观点、预测并不是未来实际表现，“恒天财富”可以在不发出通知的情况下做出更改，同时“恒天财富”并不承担提示这些注意事项的责任。本报告中的任何观点与预测，仅反映“恒天财富”在发布该报告当日的分析师判断，并不代表“恒天财富”任何部门。未经“恒天财富”事先书面授权，任何人不得以任何目的复制、发送或销售本报告。“恒天财富”版权所有，保留一切权利。</div>
            </div>
        </div>
        
    </div>        
</template>

<script>
//import Vue from 'vue';
import "./shareRecommendation.less";

import "./shareRecommendation.js";

import tipAction from "@common/components/otherComponents/tipAction/tipAction";

export default {
    name: "shareRecommendation",
    data() {
        return {
            assetConfigId:null,
            assetConfigAmountList:[],
            tableData:[],
            listData:[],
            assetNowObj:{
                el:"nowPie",
                titleText:"客户资产配置现状",
                color:["#968c8a","#94b6d1","#dd8045","#a4ab82","#d7b15c","#7ca59d"],
                legendData:[],
                seriesData:[]
            },
            assetRecommendObj:{
                el:"recommendPie",
                titleText:"",
                color:["#3992e3","#235dc4","#fc6600","#c2c2c2","#ffc000","#77d537"],
                legendData:[],
                seriesData:[]
            },
            BarObj:{
                el:"bar",
                titleText:"",
                color:['#0c7cd5', '#ff6300'],
                xAxisData:[],
                data1:[],
                data2:[]
            },
            forwardData:{
                dictionary:null,
                investSuggest:null,
                allForwardProducts:{
                    productVOS:[]
                },
                recommendForwardProducts:{
                     productVOS:[]
                },
                detail:{
                    customerName:null,
                    canConfigAssets:null,
                    canConfigAssetsToThousand:null,
                    lifeTerm:null,
                    riskType:null,
                    createTime:null,
                    empName:null,
                    email:null,
                    phone:null,
                    lifeTermText:null,
                    riskTypeText:null,
                    assetScope:null,
                    assetConfigAmountList:[],

                },
            }
        };    
    },
    created: function() {  
        this.getForward(); 

    },
    mounted(){
        
    },
    methods: {
        getForward(){

            //把id参数末尾的0A替换成20，兼容6p
            var wxId = splitUrl()['id'];
            var a = wxId.lastIndexOf('0A');
            if( a == (wxId.length - 2) ){
                //末尾是0A
                wxId = wxId.substring(0, a) + '20';
            }

            this.$axiosHttp.http({
                name:'转发接口',
                method:'get',
                url: apiUrl.assetConfigForwardDetailInfoApi,
                needFailCallback:true,
                params:{
                    id: wxId
                }
            }, (res) => {
                this.forwardData=res.data.data;

                //处理详情，客户输入资产范围描述
                this.forwardData.detail.canConfigAssetsToThousand = this.$utils.toThousand(this.forwardData.detail.canConfigAssets);
                let canConfigAssets = this.forwardData.detail.canConfigAssetsToThousand;

                if (canConfigAssets<500) {
                    this.forwardData.detail.assetScope="500万元以下"

                }else if (canConfigAssets >= 500 && canConfigAssets<1000) {
                    this.forwardData.detail.assetScope="500-1000万元"

                }else if (canConfigAssets >= 1000 && canConfigAssets<3000) {
                    this.forwardData.detail.assetScope="1000-3000万元"

                }else if (canConfigAssets >= 3000 && canConfigAssets<10000) {
                    this.forwardData.detail.assetScope="3000万-1亿元"

                }else if (canConfigAssets >= 10000) {
                    this.forwardData.detail.assetScope="1亿元以上"

                }

                //处理生命周期及风险类型字典
                for (var i = 0; i < this.forwardData.dictionary[1001].length; i++) {//生命周期阶段
                    var obj =this.forwardData.dictionary[1001][i];
                    if(obj.keyNo==this.forwardData.detail.lifeTerm){
                        this.$Vue.set(this.forwardData.detail, 'lifeTermText', obj.keyValue);
                    } 
                }

                for (var i = 0; i < this.forwardData.dictionary[1002].length; i++) {//风险类型
                    var obj =this.forwardData.dictionary[1002][i];

                    if(obj.keyNo==this.forwardData.detail.riskType){
                        this.$Vue.set(this.forwardData.detail, 'riskTypeText', obj.keyValue);
                    } 
                }
                //处理饼图数据
                this.assetConfigAmountList=this.forwardData.detail.assetConfigAmountList;

                this.assetConfigAmountList.forEach((course, courseIndex, array) =>{
                    for (var i = 0; i < this.forwardData.dictionary[1003].length; i++) {//资产分类1003
                        var obj =this.forwardData.dictionary[1003][i];
                        if(obj.keyNo==course.assetClassify){
                            this.$Vue.set(course, 'assetClassifyText', obj.keyValue);
                        } 
                    }

                    for (var i = 0; i < this.forwardData.dictionary[1004].length; i++) {//资产类别1004
                        var obj =this.forwardData.dictionary[1004][i];
                        if(obj.keyNo==course.assetType){
                            this.$Vue.set(course, 'assetTypeText', obj.keyValue);
                        } 
                    }

                    if (course.assetNowRatio != 0 && course.assetNowRatio !=null) {
                        this.assetNowObj.legendData.push(course.assetTypeText);
                    
                        this.assetNowObj.seriesData.push({
                            "value":course.assetNowRatio,
                            "name":course.assetTypeText
                        });
                    }
                    if (course.assetRecommendRatio!= 0&& course.assetRecommendRatio !=null) {
                        this.assetRecommendObj.legendData.push(course.assetTypeText);
                    
                        this.assetRecommendObj.seriesData.push({
                            "value":course.assetRecommendRatio,
                            "name":course.assetTypeText
                        });

                    }
                    
                    

                    this.assetRecommendObj.titleText=this.forwardData.detail.assetScope+"+"+this.forwardData.detail.lifeTermText+"+"+this.forwardData.detail.riskTypeText

                    this.BarObj.xAxisData.push(course.assetTypeText);
                    
                    this.BarObj.data1.push(this.$utils.toThousand(course.assetNow));
                    
                    this.BarObj.data2.push(this.$utils.toThousand(course.assetRecommend));

                })
                if (this.assetNowObj.seriesData.length != 0) {
                    this.drawPie(this.assetNowObj);
                }else{
                    $("#nowPie").addClass("noChart");
                }
                if (this.assetRecommendObj.seriesData.length != 0) {
                    this.drawPie(this.assetRecommendObj);
                }else{
                    $("#recommendPie").addClass("noChart");
                }
                
                if (this.BarObj.data1 != 0 ||this.BarObj.data2 != 0) {
                    this.drawBar(this.BarObj);
                }

                //处理理顾推荐产品及后台所有产品
                this.DicConversion(this.forwardData.recommendForwardProducts);
                this.DicConversion(this.forwardData.allForwardProducts);
                
            }, res => {
               
            })
        },
        drawPie(obj){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(obj.el));
            let normal={ 
                borderColor: "#FFF", 
                borderWidth: 1, 
            }
            // 绘制图表
            if (obj.seriesData.length==1) {
                normal={ 
                    borderColor: "", 
                    borderWidth: 0, 
                }
            }
            // 绘制图表
            myChart.setOption({
                color:obj.color,
                backgroundColor: '#fff',
                title: { 
                    text:obj.titleText,
                    x:'center',
                    textStyle:{
                        fontSize:12,
                        color: '#e5323e',
                        fontWeight: 'lighter',
                    }
                },

                legend: {
                    selectedMode:false,
                    orient: 'horizontal',
                    bottom: '30',
                    data:obj.legendData,
                    padding: [5,50],
                    itemWidth:10,
                    itemHeight: 10
                },

                series : [
                    {
                        type: 'pie',
                        legendHoverLink:false,
                        hoverAnimation:false,
                        animation: false,
                        radius : '55%',
                        center: ['50%', '40%'],
                        label:{
                            normal: {
                               position: "outside",
                               formatter: '{d}%',
                               fontSize:6,
                               color: '#999',
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data:obj.seriesData,
                        itemStyle: { 
                            normal: { 
                                borderColor: "#FFF", 
                                borderWidth: 1, 
                            },
                            
                        },
                    }
                ]
            });
            //setTimeout(function(){ return myChart.getDataURL(); }, 3000);
            return myChart.getDataURL();
        },
        drawBar(obj){
            let myChart = this.$echarts.init(document.getElementById(obj.el));
            myChart.setOption({
                backgroundColor: '',
                color:obj.color, 
                title : {
                    text:obj.titleText,
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['资产配置现状','建议资产配置'],
                    bottom: 'bottom',
                    itemWidth:10,
                    itemHeight: 10
                },
                calculable : true,
                grid:{
                    left:'10%',
                    bottom:'35%',
                    containLabel:true
                },
                xAxis : [
                    {
                        type : 'category',
                        data :obj.xAxisData,
                        axisLabel: {
                            interval:0,
                            rotate:40,
                            align:'right',
                            margin:10,
                            fontSize:8,
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '(万元)',
                    }
                ],
                series : [
                    {
                        name:'资产配置现状',
                        type:'bar',
                        data:obj.data1,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999'
                                },

                            }
                        }
                    },
                    {
                        name:'建议资产配置',
                        type:'bar',
                        data:obj.data2,
                        label: {
                            //offset: [20,50],
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        }
                    }
                ]
            });
            return myChart.getDataURL();
        },
        //处理下拉列表中的字典数据
        DicConversion(datas){
            datas.forEach((course, courseIndex, array) =>{
                course.assetRecommend=this.comdify(course.assetRecommend)+".00";
                for (var i = 0; i < this.forwardData.dictionary[1003].length; i++) {//资产分类1003
                    var obj =this.forwardData.dictionary[1003][i];
                    if(obj.keyNo==course.assetClassify){
                        this.$Vue.set(course, 'assetClassifyText', obj.keyValue);
                    } 
                }

                for (var i = 0; i < this.forwardData.dictionary[1004].length; i++) {//资产类别1004
                    var obj =this.forwardData.dictionary[1004][i];
                    if(obj.keyNo==course.assetType){
                        this.$Vue.set(course, 'assetTypeText', obj.keyValue);
                    } 
                }

                for (var i = 0; i < this.forwardData.dictionary[1005].length; i++) {//推荐产品类型1005
                    var obj =this.forwardData.dictionary[1005][i];

                    for( var j = 0; j < course.productVOS.length; j++){

                        if(obj.keyNo == course.productVOS[j].productType){

                            this.$Vue.set(course.productVOS[j], 'productTypeText', obj.keyValue);
                        } 
                    }

                    
                }

                for (var i = 0; i < this.forwardData.dictionary[1006].length; i++) {//推荐产品细分策略1006
                     var obj = this.forwardData.dictionary[1006][i];

                     for( var j = 0; j < course.productVOS.length; j++){

                         if(obj.keyNo == course.productVOS[j].subdivisionStrategy){
                             
                             this.$Vue.set(course.productVOS[j], 'subdivisionStrategyText', obj.keyValue);
                         } 
                     }
                }
                
                this.$Vue.set(course, 'isFold', false);

                var productVOS=course.productVOS
            })
        },
        //下拉列表展开数据
        changeStatus(el){
            if (el.isFold) {
                el.isFold=false;
            }else{
                if (el.productVOS.length!=0) {
                    el.isFold=true;
                } 
            }
        },
        comdify(n) {
            //n是传进来的需要添加千分位的数据，格式需要为字符串
            if (typeof n == 'number') {
                n = n + ''; //n如果为数字，转换成字符串
            }
            //添加千分位
            var re = /\d{1,3}(?=(\d{3})+$)/g;
            var n1 = n.replace(/^(\d+)((\.\d+)?)$/,
                function(s, s1, s2) {
                    return s1.replace(re, "$&,") + s2;
                }
            );
            //返回处理过的字符串

            return n1;
        },
    }

};
</script>