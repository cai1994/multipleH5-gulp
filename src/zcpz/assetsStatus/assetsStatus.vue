<!-- 资产配置现状 -->

<template>
    <div class="formSection">

        <div class="formWrap">
            <!-- 提示内容  -->
            <discription discriptionTxt="填写您客户目前的资产配置现状信息，用于与全生命周期资产配置模型建议配置比例进行对照，可选择填写"></discription>

            <!-- 表单 -->
            <ul class="list">

                <li class="item hasUnit" v-for="(list, index) in formList" :index="index">

                    <label class="lb" v-if="list.memo" ><span>{{list.name}}</span><br/><span class="gray">{{list.memo}}</span></label>
                    <label class="lb" v-else >{{list.name}}</label>
                    
                    <div class="unit">万元</div>
                    <input v-model="formData.ratioList[index].assetNow" class="ipt" type="tel" placeholder="请输入" maxlength="10"  oninput="value=value.replace(/[^0-9]/g,'');" />
                </li>

                <!-- <li class="item hasUnit">
                    <label class="lb">
                        <span>海外产品金额</span>
                        <br/>
                        <span class="gray">(移民、置业)</span>
                    </label>
                    <div class="unit">万元</div>
                    <input v-model="formData.seaAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.seaAmountNow=NumberCheck(formData.seaAmountNow)" />
                </li>
                <li class="item hasUnit">
                    <label class="lb">家族信托金额</label>
                    <div class="unit">万元</div>
                    <input v-model="formData.familyAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.familyAmountNow=NumberCheck(formData.familyAmountNow)" />
                </li>
                <li class="item hasUnit">
                    <label class="lb">货币类基金金额</label>
                    <div class="unit">万元</div>
                    <input v-model="formData.moneyAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10" @change="formData.moneyAmountNow=NumberCheck(formData.moneyAmountNow)" />
                </li>
                <li class="item hasUnit">
                    <label class="lb">固收投资产品金额</label>
                    <div class="unit">万元</div>
                    <input v-model="formData.bondAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10" @change="formData.bondAmountNow=NumberCheck(formData.bondAmountNow)" />
                </li>
                <li class="item hasUnit">
                    <label class="lb">浮收投资产品金额</label>
                    <div class="unit">万元</div>
                    <input v-model="formData.floatAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.floatAmountNow=NumberCheck(formData.floatAmountNow)"/>
                </li> -->
            </ul>

            <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" btnText="生成资产配置建议书" ></bottom-fixedbutton>

        </div>

        <echart-data ref="echartWrap" :id="echartId"  :descArr="descArr"></echart-data>

    </div>        
</template>



<script>
import "./assetsStatus.less";

//import "./assetsStatus.js";

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

import discription from '@src/common/discription/discription'

//请求画图数据
import echartData from '@src/zcpz/common/getEchartData/getEchartData'

var arg = splitUrl(),
    argType = arg['type'], //新建/编辑
    argId = arg['id']; //上一步带过来的资产配置id

export default {
    name: "assetsStatus",
    components:{
        bottomFixedbutton,
        discription,
        echartData,
    },
    data() {
        return {
            
            echartId: argId,

            //存放接口拿到的表单列表
            formList : [],

            //表单提交字段
            formData:{
                id: argId, //资产配置id
                ratioList: []
            },

            //接口请求回来的字典值保存，传递给画图组件
            descArr: {  
                lifeTermDic: null, //生命周期
                riskTypeDic: null, //风险偏好
                assetClassifyDic: null, //资产分类
                assetTypeDic: null, //资产类别
            },

            //控制按钮点击
            isClick: false, 
        };
    },
    created: function() { 

        //获取字典值
        this.getDic();

        //获取表单
        this.getForm();
        
    },

    mounted(){

      //兼容安卓手机键盘出现后把节点顶起来的情况
      $('body').height($('body')[0].clientHeight);
    },

    methods: {

        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                data: ["1001", "1002","1003", "1004"], 
            }, (res) => {

                this.descArr.lifeTermDic=res.data.data[1001];
                this.descArr.riskTypeDic = res.data.data[1002];  //风险承受能力字典值
                this.descArr.assetClassifyDic = res.data.data[1003]; //资产分类
                this.descArr.assetTypeDic = res.data.data[1004]; //资产类别
                
            })

        },

        //获取表单
        getForm(){
            this.$axiosHttp.http({
                name:'获取资产配置现状表单',
                url: apiUrl.getAssetsCurrentFormKeyApi,
                needFailCallback: true,
                params: {}
            }, (res) => {
                //渲染表单
                this.formList = res.data.data;

                //设置formData.ratioList，循环后，ratioList应该多出了每项表单对应的字段
                this.formList.forEach( (item, index, arr) => {
                    this.formData.ratioList.push({
                        assetType: item.key,
                        assetNow: null
                    });
                })
                
                if( !!argType && argType == 'edit'){

                    //请求回显数据
                    this.$axiosHttp.http({
                        name:'获取回显数据',
                        url: apiUrl.getCustomerAssetDetailByIdApi,
                        params: {
                            id: argId
                        }
                    }, (res) => {
                        var data = res.data.data,
                            assetConfigAmountList = data.assetConfigAmountList;

                        //循环表单，回显
                        this.formList.forEach( (list, i, ar) =>{

                            var assetText = assetConfigAmountList.filter(function(el, i){
                                return el.assetType == list.key;
                            });

                            //要从元转成万元
                            ( assetText && assetText.length && assetText[0].assetNow ) && (this.formData.ratioList[i].assetNow = this.$utils.toThousand ( assetText[0].assetNow ) );

                            
                        })

                        
                        
                    })
                }

            }, (res) => {
               tipAction(res.data.message);
            })
        },

        //提交表单
        submitForm(){

            var that = this;

            var $formData = this.$utils.objDeepCopy(this.formData);
            //使用json.stringify转换对象会丢失值为空的或是null的
            //对象深拷贝使用objDeepCopy方法
            var $formDataRatioList = this.$utils.objDeepCopy(this.formData.ratioList);
            //var $validFormElements = this.$utils.objDeepCopy(this.validFormElements);

            //校验表单数据是否填写
            var result = true;
            $formDataRatioList.every( (item) => {
                // if( this.$utils.checkIsEmpty( !!item.assetNow ? item.assetNow : '' ) ){
                //     //没填写
                //     tipAction( '请填写' + this.formList.filter(function(el, i){
                //         return el.key == item.assetType
                //     })[0].name );
                //     //未通过校验
                //     result = false;
                //     //离开循环
                //     return false;
                // }
                // else if ( item.assetNow < 100 ){
                //     tipAction( this.formList.filter(function(el, i){
                //         return el.key == item.assetType
                //     })[0].name +  '不得少于100万元');
                //     //未通过校验
                //     result = false;
                //     //离开循环
                //     return false;
                // }
                // else{
                    //对于every这个方法，一定要写这一句
                    //有填写，要把元转成万元
                    if( !!item.assetNow ){
                        item.assetNow = this.$utils.toOne( Number(item.assetNow) )
                    }
                    else{
                        item.assetNow = '';
                    }
                    return true;
                //}
            })

            $formData.ratioList = $formDataRatioList;

            if( !result ){
                //未通过校验
                return false;
            }

            //请求接口前，将按钮设为不可点击
            if ( that.isClick ){
                return false;
            }
            that.isClick = true;

            that.$axiosHttp.http({
                name:'提交资产配置表单',
                url: apiUrl.saveCustomerAssetThirdStepApi,
                needFailCallback: true,
                data: $formData
            }, (res) => {

                var data = res.data.data;
                    
                //保存当前资产配置id，请求资产配置详情
                //拿到客户姓名  资产量级  生命周期  风险偏好
                that.$axiosHttp.http({
                    name:'查询详情',
                    url: apiUrl.getCustomerAssetDetailByIdApi,
                    params: {
                        id: data.id
                    }
                }, (res) => {

                    var dataDetail = res.data.data;

                    //生命周期
                    var lifeTerm =  this.descArr.lifeTermDic.filter(function(el){
                        return el.keyNo == dataDetail.lifeTerm
                    });
                    var lifeTermText = lifeTerm.length ? lifeTerm[0].keyValue : '';

                    //风险承受能力
                    var riskType =  this.descArr.riskTypeDic.filter(function(el){
                        return el.keyNo == dataDetail.riskType
                    });
                    var riskTypeText = riskType.length ? riskType[0].keyValue : '';

                        
                    //设置传递给画图组件的title，资产量级需要转为万元
                    this.$refs.echartWrap.title = this.$utils.toThousand( Number( dataDetail.canConfigAssets) ) + '万元' + '+' + lifeTermText + '+' + riskTypeText;

                    //设置传给画图组件的customerName
                    this.$refs.echartWrap.customerName = dataDetail.customerName;

                    //画图
                    this.$refs.echartWrap.getDrawData();

                    this.isClick = false;

                })

            }, (res) => {
               tipAction(res.data.message);
               that.isClick = false;
            })
            
            
            
        },

        
    }
};
</script>