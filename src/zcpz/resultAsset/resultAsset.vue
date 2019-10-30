<!-- 选择页面 -->
<template>
    <div class="resultAsset">

        <div class="listSection">
            <list :list="listData_1" type="rightSide"></list>
            <list :list="listData_2" type="rightSide"></list>
            <list :list="listData_3" type="rightSide"></list>

            <!-- 底部按钮 -->
            <bottom-fixedbutton  twoButton="true" :twoButtonList="buttonList" ></bottom-fixedbutton>
        </div>

        <!-- <echart-data ref="echartWrap" :id="echartId"  :descArr="descArr"></echart-data> -->

        

    </div>
</template>

<script>

import "./resultAsset.less";
//import "./questionnaire.js";

 
//import searchList from '@src/common/searchList/searchList'

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import list from '@src/common/list/list'

import tipAction from '@common/components/otherComponents/tipAction/tipAction'

//请求画图数据
// import echartData from '@src/zcpz/common/getEchartData/getEchartData'

//MUI日历和下拉菜单
// import popPicker from '@src/common/mui/popPicker/popPicker.js' 
// import '@common/less/mui/resetMuiPop.less';

var arg = splitUrl(),
    argType = arg['type'],
    argId = arg['id']; //上一步带过来的资产配置id

export default {
    name: "resultAsset",
    components:{
        bottomFixedbutton,
        list,
        // echartData
    },
    data() {
        var that = this;

        return {

            // echartId: argId,
            customerName: null,

            //设置按钮的默认文案
            listData_1: [{
                txt: '您的资产量级为',
                name: ''
            }],
            listData_2: [{
                txt: '您的生命周期处于',
                name: ''
            }],
            listData_3: [{
                txt: '您的风险偏好为',
                name: ''
            }],

            buttonList: {
                left: {
                    txt: '生成资产配置建议书',
                    clickFunc: function(){
                        //请求画图数据
                        // that.$refs.echartWrap.getDrawData();
                        
                        //打开pdf
                        window.location.href = apiUrl.downloadPdfReportApi + '?assetConfigId=' + argId + '&customerName=' + encodeURI(that.customerName);
                    },
                    type: "type_1"
                },
                right: {
                    txt: '填写客户资产配置现状',
                    clickFunc: function(){

                        //跳转到资产配置现状页面
                        var url = goUrl.assetsStatusUrl + '?id=' + argId;

                        if ( !!argType && argType == 'edit'){
                            //有type参数
                            window.location.href = url + '&type=' + argType;
                        }
                        else{
                            window.location.href = url;
                        }
                    },
                    type: "type_1"
                }
            },

            //接口请求回来的字典值保存
            descArr: {      
                lifeTermDic: null, //生命周期
                riskTypeDic: null, //风险偏好
                assetClassifyDic: null, //资产分类
                assetTypeDic: null, //资产类别
            },
        };
    },
    created: function() {

        //请求字典
        this.getDic();
    },
    methods: {

        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                data:["1001", "1002","1003", "1004"], 
            }, (res) => {
               /* 1000是与否
                1001生命周期阶段
                1002客户风险承受能力
                1003资产分类
                1004资产类别
                1005项目类型
                1006细分策略
                1007家庭未来现金流稳定性*/

                //1001生命周期阶段
                this.descArr.lifeTermDic=res.data.data[1001];
                this.descArr.riskTypeDic = res.data.data[1002];  //风险承受能力字典值
                this.descArr.assetClassifyDic = res.data.data[1003]; //资产分类
                this.descArr.assetTypeDic = res.data.data[1004]; //资产类别
                
                //请求当前页面的数据
                this.getData();
            })

        },

        //当前页面的数据
        getData(){

            this.$axiosHttp.http({
                name:'选择页面结果回显',
                url: apiUrl.getCustomerAssetDetailByIdApi,
                params: {
                    id: argId, //资产配置id 
                }
            }, (res) => {

                var data = res.data.data;

                //资产量级
                this.listData_1[0].name = this.$utils.toThousand( Number( data.canConfigAssets) ) + '万元';

                //生命周期
                var lifeTerm =  this.descArr.lifeTermDic.filter(function(el){
                    return el.keyNo == data.lifeTerm
                });
                this.listData_2[0].name = lifeTerm.length ? lifeTerm[0].keyValue : '';

                //风险承受能力
                var riskType =  this.descArr.riskTypeDic.filter(function(el){
                    return el.keyNo == data.riskType
                });
                this.listData_3[0].name = riskType.length ? riskType[0].keyValue : '';

                this.customerName = data.customerName;

                //设置传递给画图组件的title
                // this.$refs.echartWrap.title = this.listData_1[0].name + '+' + this.listData_2[0].name + '+' + this.listData_3[0].name;

                //设置传给画图组件的customerName
                // this.$refs.echartWrap.customerName = data.customerName;

            })
        },



        
    }
};
</script>