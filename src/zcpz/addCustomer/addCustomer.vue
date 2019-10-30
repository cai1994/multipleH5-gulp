<!-- 新建跟踪客户 -->
<template>
    <div class="formSection">
        <ul class="list">

            <li class="item">
                <label class="lb">客户名称</label>
                <input class="ipt" type="text" v-model="formData.customerName" placeholder="请输入" maxlength="50">
            </li>

            <li class="item itemSelect">
                <label class="lb">证件类型</label>
                <i class="mui-icon mui-icon-forward"></i>
                <span :class="formDesc.cardTypeText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openCardType()">
                    <template v-if="formDesc.cardTypeText">
                        {{formDesc.cardTypeText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>

            <li class="item">
                <label class="lb">证件号码</label>
                <input class="ipt" type="text" v-model="formData.cardNumber" placeholder="请填写" maxlength="28">
                <!-- <input class="ipt" type="number" v-model="formData.cardNumber" placeholder="请填写" max="9999999999999999999999999999" step="1"> -->
            </li>

            <li class="item itemSelect">
                <label class="lb">国家地区</label>
                <i class="mui-icon mui-icon-forward"></i>
                <span :class="formDesc.countryText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openCountry()">
                    <template v-if="formDesc.countryText">
                        {{formDesc.countryText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>

            <li class="item">
                <label class="lb">手机号码</label>
               <!--  <input class="ipt" type="tel" v-model="formData.phone" placeholder="请填写" maxlength="15" > -->
               <input class="ipt" type="tel" v-model="formData.phone" placeholder="请填写" maxlength="15" oninput="value=value.replace(/[^0-9]/g,'');">
            </li>

            <li class="item">
                <label class="lb">年龄</label>
                <!-- <input class="ipt" type="text" v-model="formData.ageNum" placeholder="请填写" maxlength="3" @input="formData.ageNum=$utils.NumberCheck(formData.ageNum)"> -->
                <input class="ipt" type="tel" v-model="formData.ageNum" placeholder="请填写" maxlength="3" oninput="value=value.replace(/[^0-9]/g,'');">
            </li>

            <li class="item itemSelect">
                <label class="lb">客户来源</label>
                <i class="mui-icon mui-icon-forward"></i>
                <span :class="formDesc.customerPropertyText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="opencustSource()">
                    <template v-if="formDesc.customerPropertyText">
                        {{formDesc.customerPropertyText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>

            <li class="item itemSelect">
                <label class="lb">风险偏好</label>
                <i class="mui-icon mui-icon-forward"></i>
                <span :class="formDesc.riskTypeText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openriskType()">
                    <template v-if="formDesc.riskTypeText">
                        {{formDesc.riskTypeText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
        </ul>

        <!-- <p class="padd-l-75">请谨慎填写，填写内容将用于资产配置比例确定</p> -->
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>
        <!-- 客户弹框开始 -->
        <!-- <search-list  ref="searchCusList" @selectCus="selectCus" :httpUrl="cusUrl" :type="zcpzCus"></search-list> -->
        <!-- 客户弹框结束 -->

    </div>
</template>


<style lang="less">
    @import url('~@src/common/form/form.less');
</style>


<script>

// import "./addCustomer.less";
import "./addCustomer.js";


//import searchList from '@src/common/searchList/searchList'

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import tipAction from '@common/components/otherComponents/tipAction/tipAction'

//MUI日历和下拉菜单
import popPicker from '@src/common/mui/popPicker/popPicker.js'
import '@common/less/mui/resetMuiPop.less';

export default {
    name: "addCustomer",
    data() {
        return {
            bottomFixedbuttonText:"提交",
            zcpzCus:'zcpzCus',

            //校验提示文字
            validFormElements:{
                "customerName":"请填写客户名称",
                //"cardType": '请选择证件类型',
                //"cardNumber": '请填写证件号码',
                "areaId": '请填写国家地区', 
                "phone":"请填写手机号码",
                "ageNum":"请填写年龄",
                //"fixedCost":"请输入月度固定开销",
                "customerProperty":"请填写客户来源",
                "riskType":"请填写风险偏好",
            },

            //存储表单数据
            formData:{
                customerName:null, //客户姓名   
                cardType: null, //证件类型
                cardNumber: null, //证件号码
                areaId: null, //区域Id
                phone: null, //手机号码
                ageNum: null, //年龄
                customerProperty:null, //客户来源
                riskType:null, //客户风险承受能力
                customerNo:null, //客户编号
                countryName: null, //国家简称
                areaCode: null, //区域code 
                customerType: 1, //客户类型，默认传个人
                customerSource: 0, //默认理顾宝
            },

            //跟表单数据对应的字典文案
            formDesc: {
                riskTypeText: null, //风险承受能力,
                cardTypeText: null, //证件类型
                customerPropertyText: null, //客户来源
                countryText:null, //国家地区
            },

            //接口请求回来的字典值/数据保存
            descArr: {  
                riskTypeDic: null,  //风险承受能力
                countryDic: null, //国家地区
                cardTypeDic: null,   //证件类型
                customerPropertyDic:  null //客户来源
            },
            
            isClick: false, //控制按钮点击

        };
    },
    components:{
        bottomFixedbutton,
    },
    created: function() {
        //请求字典值
        this.getDic();
    },
    methods: {

        //获取字典/数据
        getDic(){

            //风险承受能力
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                needFailCallback:false,
                data: ["1002"]
            }, (res) => {
                //风险承受能力
                this.descArr.riskTypeDic = res.data.data[1002];
            });

            //国家地区
            this.$axiosHttp.http({
                name:'获取国家地区',
                url: apiUrl.getCountryCodeListApi,
                needFailCallback:false,
                params: {countryName: ''}
            }, (res) => {
                this.descArr.countryDic = res.data.data;
                //默认设置国家地区为中国
                this.descArr.countryDic.forEach((item, list, arr) => {
                    if( item.id == '10001'){
                        this.formDesc.countryText = item.countryName + ' ' + item.code;
                        this.formData.areaId = item.id;
                    }
                })
            });

            //证件类型和客户来源
            this.$axiosHttp.http({
                name:'获取国家地区',
                url: apiUrl.getCardTypeAndCustSourceApi,
                needFailCallback:false,
                params: {
                    custType: '1'  //资产配置只有个人客户，默认写死为个人
                }
            }, (res) => {
                var data = res.data.data;
                //证件类型
                this.descArr.cardTypeDic = data.cardType;
                //客户来源
                this.descArr.customerPropertyDic = data.custSource;

                //默认设置客户来源为自由潜客
                this.descArr.customerPropertyDic.forEach((item, list, arr) => {
                    if( item.keyNo == '3'){
                        this.formDesc.customerPropertyText = item.keyValue;
                        this.formData.customerProperty = item.keyNo;
                    }
                })

                

            });
        },


        //打开证件类型弹窗
        openCardType( ) {
            $(".ipt").blur();
            popPicker.pickerSelect( this.$utils.parseDifDicArr(this.descArr.cardTypeDic, 'keyNo', 'keyValue'), res=>{
                this.formDesc.cardTypeText = res[0].text;
                this.formData.cardType = res[0].value;
            });
        }, 

        //打开客户风险承受能力弹窗
        openriskType() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.$utils.parseDifDicArr(this.descArr.riskTypeDic, 'keyNo', 'keyValue'),res=>{
                this.formDesc.riskTypeText = res[0].text;
                this.formData.riskType = res[0].value;
            });
        },

        //打开国家地区弹窗
        openCountry() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.$utils.parseDifDicArr(this.descArr.countryDic, 'id', 'countryName'),res=>{
                //国家地区展示时，还需要显示code
                //找到对应的code
                var isCode = false;
                this.descArr.countryDic.forEach((item, list, arr) => {
                    if( item.id == res[0].value){
                        isCode = true;
                        this.formDesc.countryText = item.countryName + ' ' + item.code;
                        this.formData.areaId = item.id;
                    }
                })
                if( !isCode ){
                    //没有找到对应的code
                    this.formDesc.countryText = res[0].text;
                    this.formData.areaId = res[0].value;
                }
                //this.formDesc.countryText = res[0].text;
                //这里保存的是id，表单提交时再去获取code
                //this.formData.areaId = res[0].value;
            });
        },

        //打开客户来源弹窗
        opencustSource() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.$utils.parseDifDicArr(this.descArr.customerPropertyDic, 'keyNo', 'keyValue'),res=>{
                this.formDesc.customerPropertyText = res[0].text;
                this.formData.customerProperty = res[0].value;
            });
        },

        //下一步点击事件
        submitForm(){
            
            var that = this;

            //提交前，从国家地区数据里找到areaCode
            var theForm = this.descArr.countryDic.filter(function(el, i){
                return el.id == that.formData.areaId
            });
            ( theForm && theForm.length ) && ( this.formData.areaCode = theForm[0].code );

            for(var key in this.formData){ 
                if(this.formData[key]=="" && this.formData[key]!=0){
                    this.formData[key]=null
                }
            }

            //使用json.stringify转换对象会丢失值为空的或是null的
            //对象深拷贝使用objDeepCopy方法
            var $formData = this.$utils.objDeepCopy(this.formData);
            var $validFormElements = this.$utils.objDeepCopy(this.validFormElements);
            
            //校验表单数据是否填写
            var formCusValid = this.$utils.newFormElValid($formData,$validFormElements);

            if(!formCusValid){
                this.formValid = false;
                return;
            }

            //先判断按钮是否可点击
            if ( that.isClick ){
                return false;
            }

            //请求接口前，将按钮设为不可点击
            that.isClick = true;
            
            that.$axiosHttp.http({
                name:'新建跟踪客户保存',
                url: apiUrl.insertTrackCustomerApi,
                needFailCallback: true,
                params: $formData
            }, (res) => {

                var data = res.data.data;

                that.isClick = false;
               
                //跳转新建资产配置页面，拼上客户姓名和客户来源
                window.location.href = goUrl.addAssetUrl + '?type=cus' +  '&customerSort=' + data.customerSort + '&customerId=' + data.customerId;

            }, (res) => {
               tipAction(res.data.message);
               that.isClick = false;
            })
        }
    

    }
};
</script>