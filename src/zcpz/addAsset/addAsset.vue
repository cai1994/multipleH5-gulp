<!-- 
    新建/编辑跟踪客户

    此页面有三类情况：新建/编辑（从资产配置列表进来），从客户（app的一个入口，非H5页面）进来
    url上的type值为edit时-编辑，需要参数id（资产配置id）
    type为cus时-客户，需要app给参数customerSort和customerId
    没有type时-新建

    三种情况都先请求了查询用户接口，获得客户来源和客户姓名
-->
<template>
    <div class="formSection">
        <ul class="list">
            <li class="item itemSelect">

                <!-- 新建按钮 只有新建资产的时候才显示 -->
                <div class="add" v-if="isAdd">
                    <span class="line">/</span>
                    <div @click="goAddCustomer()" class="addBtn"> 
                        <i class="iconfont">&#xe6f7;</i>
                        <span class="addSpan">新建</span>
                    </div>
                </div>
                
                
                <label class="lb">客户</label>
                <i class="mui-icon mui-icon-forward" v-if="!formData.customerName && !isAdd"></i>
                <span  :class="formData.customerName ? 'placeholder span' : 'placeholder tipCor span'"  @click="openCusList()" >
                    <template v-if="formData.customerName">
                        {{formData.customerName}}
                    </template>
                     <template v-else>
                        请选择
                    </template>
                </span>
                
            </li>

            <li class="item hasUnit">
                <label class="lb">客户的年龄是</label>
                <div class="unit">岁</div>
                <input class="ipt" type="tel" v-model="formData.age" placeholder="请输入" maxlength="3" oninput="value=value.replace(/[^0-9]/g,'');">
            </li>

            <li class="item itemSelect">
                <label class="lb">客户的风险偏好为</label>
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

        <discription discriptionTxt="为了更加明确客户画像，输出匹配的配置方案，下一步需填写客户画像10个问题"></discription>

        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" btnText="填写问卷" ></bottom-fixedbutton>
        
        <!-- 客户弹框开始 -->
        <search-list  ref="searchCusList" @searchCallback="searchCallback" :httpUrl="cusUrl" :type="zcpzCus"></search-list>
        <!-- 客户弹框结束 -->

    </div>
</template>

<style lang="less">
    @import url('./addAsset.less');
</style>

<script>

import '@common/less/mui/resetMuiPop.less';

import "./addAsset.js";

//弹窗搜索，这里用searchList13, 为点击键盘的搜索按钮搜素，不是实时搜索
import searchList from '@src/common/searchList_13/searchList'

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import tipAction from '@common/components/otherComponents/tipAction/tipAction'

import discription from '@src/common/discription/discription'

//MUI日历和下拉菜单
import popPicker from '@src/common/mui/popPicker/popPicker.js'

//url上参数
var arg = splitUrl(),
    argType = arg['type'], //如果是新建，没有type，编辑type=edit，客户入口type=cus
    argId = arg['id'];
    //argCustomerSource = arg['customerSource'], //客户来源，从新建跟踪客户页面带过来
    //argCustomerNo = arg['customerNo']; //客户编号， 从新建跟踪客户页面带过来

export default {
    name: "addAsset",
    data() {
        return {

            isAdd: !argType ? true : false, //没有argType时，为新建

            //传给searchList，用于搜索组件里的逻辑判断
            zcpzCus:'zcpzCus',

            //客户弹层搜索列表的请求接口路径
            cusUrl : apiUrl.searchCustomerListApi,

            //校验提示文字
            validFormElements:{
                "customerName":"请选择客户",
                "age": "请输入客户的年龄",
                "riskType":"请选择客户的风险偏好",
            },

            //存储表单数据，用于提交接口
            formData:{
                customerNo:null,   //客户编号
                customerSource:null,  //客户来源
                customerName:null, //客户姓名
                age:  null,//年龄
                riskType: null,  //风险承受能力 
                id: argId ?  argId  : '', //为空时新增，否则为修改
            },

            //跟表单数据对应的字典文案（用于页面上显示）
            formDesc: {
                riskTypeText: null,  //风险承受能力
            },

            //接口请求回来的字典值保存
            descArr: {  
                riskTypeDic: null
            },

            isClick: false, //控制提交按钮点击, 默认为false，表示可点
            assetId: '', //从客户入口金来，根据客户编号获取资产配置的id

        };
    },
    components:{
        searchList,
        bottomFixedbutton,
        discription,
    },
    created: function() {
        //请求字典值
        this.getDic();
    },
    methods: {

        //点击新建按钮，跳转到新建客户页面
        goAddCustomer(){
            window.location.href = goUrl.addAssetCustomerUrl ;
        },

        //获取字典
        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                data:["1002"], 
            }, (res) => {
               /* 1000是与否
                1001生命周期阶段
                1002客户风险承受能力
                1003资产分类
                1004资产类别
                1005项目类型
                1006细分策略
                1007家庭未来现金流稳定性*/

                // this.lifeTermDic=res.data.data[1001];
                // this.cashStableDic=res.data.data[1007];
                this.descArr.riskTypeDic = res.data.data[1002];  //风险承受能力字典值
                //this.isJustNeedDic=res.data.data[1000];
                //this.isInvestNeedDic=res.data.data[1000];

                //判断当前页面是作为新建还是编辑
                this.getData( argType );

            }, res => { 
               
            })

        },

        //获取当前页面的回显数据
        getData( type ){
            
            if( type == 'edit' ){
                //编辑，需要请求回显数据
                this.getCustomerAssetDetailById();
            }
            else if (type == 'cus'){
                //从客户（app的一个入口，非H5页面）进来的，
                //this.searchCusList = false;
                this.getUser();
            }
            //else {
                //新建页面，如果有客户编号和客户来源，表示从新建跟踪客户页面回来的，请求回显数据
                // if( argCustomerSource && argCustomerNo){
                //     this.getCustomerAssetDetailById({
                //         customerSource: argCustomerSource,
                //         custNo: argCustomerNo
                //     });
                // }
                
            //}

        },

        //编辑资产配置--回显
        getCustomerAssetDetailById(){

            this.$axiosHttp.http({
                name:'编辑资产配置时进入页面回显',
                url: apiUrl.getCustomerAssetDetailByIdApi,
                params: {
                    id: argId //资产配置id 
                }
            }, (res) => {
                var data = res.data.data;

                this.formData.customerNo = data.customerNo; //客户编号
                this.formData.customerSource = data.customerSource; //客户来源
                this.formData.customerName = data.customerName; //客户姓名
                this.formData.riskType = data.riskType ? data.riskType : null;  //风险承受能力
                this.formData.age = data.age ? data.age : null; //年龄

                //获取风险承受能力对应的文案
                var riskArr =  this.descArr.riskTypeDic.filter(function(el){
                    return el.keyNo == data.riskType
                });
                this.formDesc.riskTypeText = (riskArr.length ) ? riskArr[0].keyValue : null;

            })
        },

        //获取用户信息
        getUser(){
            this.$axiosHttp.http({
                name:'获取用户',
                url: apiUrl.getCustomerInfoByIdAndSortApi,
                params: {
                    customerSort: arg['customerSort'],
                    customerId: arg['customerId']
                }
            }, (res) => {
                var data = res.data.data;
                this.getAssetId(data)
            }, res => {
               
            })

        },
        // 根据用户编号获取资产配置的id
        getAssetId(item){
            this.$axiosHttp.http({
                name:'获取用户',
                url: apiUrl.selectNewAssetConfigApi,
                method: 'GET',
                params: {
                    customerSource: item.customerSource, //客户来源
                    customerNo: item.customerId  //客户编号
                },
                needFailCallback:true
            }, (res) => {

                    var data = res.data.data;
                    this.assetId = data.id;
                    this.formData.customerNo = data.customerNo; //客户编号
                    this.formData.customerSource = data.customerSource; //客户来源
                    this.formData.customerName = data.customerName; //客户姓名
                    this.formData.riskType = data.riskType ? data.riskType : null;  //风险承受能力
                    this.formData.age = data.age ? data.age : null; //年龄

                    //获取风险承受能力对应的文案
                    var riskArr =  this.descArr.riskTypeDic.filter(function(el){
                        return el.keyNo == data.riskType
                    });
                    this.formDesc.riskTypeText = (riskArr.length ) ? riskArr[0].keyValue : null;
                
                
            },(res) =>{
                if(res.data.status=='1000'){
                    this.getCustomerAssetDetailByCustomerApi(item)
                }else{
                    tipAction(res.data.message);
                }
            })
        },


        //打开客户弹窗
        openCusList(){
            var type = argType;

            if( !type ){
                //type没有值的时候  打开弹窗
                this.$refs.searchCusList.open();
            }
        },

        //searchList_13组件搜索后，列表点击调用的回调函数
        searchCallback( item ){
            //请求此客户的数据回显到页面上
            this.getCustomerAssetDetailByCustomerApi(item);
        },


        //请求此客户的数据回显到页面上(年龄和风险偏好)
        getCustomerAssetDetailByCustomerApi( item ){
            
            this.$axiosHttp.http({
                name:'请求客户数据回显到页面上',
                url: apiUrl.getCustomerAssetDetailByCustomerApi,
                params: {
                    customerSource: item.customerSource, //客户来源
                    customerNo: item.customerId  //客户编号
                }
            }, (res) => {
                var data = res.data.data;

                this.formData.customerNo = data.customerNo; //客户编号
                this.formData.customerSource = data.customerSource; //客户来源
                this.formData.customerName = data.customerName; //客户姓名
                this.formData.riskType = data.riskType ? data.riskType : null;  //风险承受能力
                this.formData.age = data.age ? data.age : null; //年龄

                //获取风险承受能力对应的文案
                var riskArr =  this.descArr.riskTypeDic.filter(function(el){
                    return el.keyNo == data.riskType
                });
                this.formDesc.riskTypeText = (riskArr.length ) ? riskArr[0].keyValue : null;

            })
        },

        //打开客户风险承受能力弹窗
        openriskType() {
            $("input").blur();
            popPicker.pickerSelect(this.$utils.parseDifDicArr(this.descArr.riskTypeDic, 'keyNo', 'keyValue'),res=>{
                this.formDesc.riskTypeText = res[0].text;
                this.formData.riskType = res[0].value;
            });
        },

        //下一步点击事件
        submitForm(){
            
            var that = this;

            for(var key in this.formData){ 
                if(this.formData[key] == "" && this.formData[key] !=0 ){
                    this.formData[key]=null
                }
            }

            //使用json.stringify转换对象会丢失值为空的或是null的
            //对象深拷贝使用objDeepCopy方法
            var $formData = this.$utils.objDeepCopy(this.formData);
            var $validFormElements = this.$utils.objDeepCopy(this.validFormElements);
            
            //校验表单数据是否填写
            var formCusValid = this.$utils.newFormElValid($formData, $validFormElements);

            if(!formCusValid){
                this.formValid = false;
                return;
            }

            //先判断按钮是否可点击
            if ( that.isClick ){
                return false;
            }
            if(argType == 'cus'){ //从客户过来
                $formData.id = this.assetId;
            }

            //请求接口前，将按钮设为不可点击
            that.isClick = true;
            that.$axiosHttp.http({
                name:'新建资产第一步保存',
                url: apiUrl.saveCustomerAssetFirstStepApi,
                needFailCallback: true,
                params: $formData
            }, (res) => {

                var data = res.data.data;

                //替换当前id
                this.formData.id = data.id;

                that.isClick = false;
        
                //跳转问卷页面的url                
                var url = goUrl.questionnaireUrl + '?id=' + data.id;
                
                if ( !!argType && argType == 'edit'){
                    //有type参数
                    window.location.href = url + '&type=' + argType;
                }else if(!!argType && argType == 'cus' && this.assetId != ''){
                    //有type参数
                    window.location.href = goUrl.questionnaireUrl+'?id=' + this.assetId + '&type=edit';
                }else{
                    window.location.href = url;
                }
                
            }, (res) => {
                //保存失败
                tipAction(res.data.message);
                that.isClick = false;
            })
        },
        
    }
};
</script>