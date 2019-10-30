<template>
    <div class="formSection">
        <ul class="list">
            <li class="item itemSelect">
                <label class="lb">客户</label>
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
                <label class="lb">可配置资产</label>
                <div class="unit">万元</div>
                <input class="ipt" type="text" v-model="formData.canConfigAssets" placeholder="请填写" maxlength="10" @change="formData.canConfigAssets=NumberCheck(formData.canConfigAssets)">
            </li>
            <li class="item itemSelect">
                <label class="lb">生命周期阶段</label>
                <span :class="lifeTermText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openlifeTerm()">
                    <template v-if="lifeTermText">
                        {{lifeTermText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
            <li class="item hasUnit mar-t-5">
                <label class="lb">月度固定开销</label>
                <div class="unit">元</div>
                <input class="ipt" type="text" v-model="formData.fixedCost" placeholder="请输入" maxlength="10" @change="formData.fixedCost=NumberCheck(formData.fixedCost)">
            </li>
            <li class="item itemSelect">
                <label class="lb">家庭未来现金流稳定性</label>
                <span :class="cashStableText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="opencashStable()">
                    <template v-if="cashStableText">
                        {{cashStableText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
            <li class="item itemSelect">
                <label class="lb">客户风险承受能力</label>
                <span :class="riskTypeText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openriskType()">
                    <template v-if="riskTypeText">
                        {{riskTypeText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
            <li class="item itemSelect yesOrNot mar-t-5">
                <label class="lb">
                    <span>是否有海外刚需型资产配置需求?</span>
                    <br>
                    <span class="gray">(海外置业、移民、留学)</span>
                </label>
                <span :class="isJustNeedText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openisJustNeed()">
                    <template v-if="isJustNeedText">
                        {{isJustNeedText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
            <li class="item hasUnit" v-if="formData.isJustNeed == '1'">
                <label class="lb">海外配置金额</label>
                <div class="unit">万元</div>
                <input class="ipt" type="text" v-model="formData.overseasAmount" placeholder="请填写" maxlength="10"  @change="formData.overseasAmount=NumberCheck(formData.overseasAmount)">
            </li>

            <li class="item itemSelect yesOrNot mar-t-5">
                <label class="lb">
                    <span>是否有海外可投资型资产配置需求?</span>
                    <br>
                    <span class="gray">(海外私募，公募产品)</span>
                </label>
                <span :class="isInvestNeedText ? 'placeholder span' : 'placeholder tipCor span'"  @tap="openisInvestNeed()">
                    <template v-if="isInvestNeedText">
                        {{isInvestNeedText}}
                    </template>
                    <template v-else>
                        请选择
                    </template>
                </span>
            </li>
        </ul>
        <p class="padd-l-75">请谨慎填写，填写内容将用于资产配置比例确定</p>
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>
        <!-- 客户弹框开始 -->
        <search-list  ref="searchCusList" @selectCus="selectCus" :httpUrl="cusUrl" :type="zcpzCus"></search-list>
        <!-- 客户弹框结束 -->
    </div>
</template>

<script>
import "./newAssetInfo.less";

import "./newAssetInfo.js";

import searchList from '@src/common/searchList/searchList'

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import tipAction from '@common/components/otherComponents/tipAction/tipAction'

//MUI日历和下拉菜单
import popPicker from '@src/common/mui/popPicker/popPicker.js'
import '@common/less/mui/resetMuiPop.less';

export default {
    name: "newAssetInfo",
    data() {
        return {
            bottomFixedbuttonText:"下一步",
            zcpzCus:'zcpzCus',

            //9项校验
            validFormElements:{
                //"customerNo":"请选择客户编号",
                "customerName":"请选择客户",
                //"customerSource":"请选择客户来源",
                "canConfigAssets":"请输入可配置资产",
                "lifeTerm":"请选择生命周期阶段",
                "fixedCost":"请输入月度固定开销",
                "cashStable":"请选择家庭未来现金流稳定性",
                "riskType":"请选择客户风险承受能力",
                "isJustNeed":"请选择是否有海外刚需型资产配置需求",
                "overseasAmount":"请输入海外配置金额",
                "isInvestNeed":"请选择是否有海外可投资型资产配置需求",
                //"empNo":"请选择客户",
            },

            //存储表单数据
            formData:{
                oldAssetConfigId:null,
                customerNo:null,
                customerName:null,
                customerSource:null,
                canConfigAssets:null,
                lifeTerm:null,
                fixedCost:null,
                cashStable:null,
                riskType:null,
                isJustNeed:null,
                overseasAmount:null,
                isInvestNeed:null,
                //empNo:null,
            },

            lifeTermDic:[],
            lifeTermText:null,
            cashStableDic:[],
            cashStableText:null,
            riskTypeDic:[],
            riskTypeText:null,
            isJustNeedDic:[],
            isJustNeedText:null,
            isInvestNeedDic:[],
            isInvestNeedText:null,
            searchCusList:true,
            isClick: false, //控制按钮点击

        };
    },
    components:{
        searchList,
        bottomFixedbutton
    },
    created: function() {
        this.getDic();
        this.cusUrl = apiUrl.searchCustomerListApi;

        

    },
    methods: {
        //获取回显数据
        getData(){
            var sData = splitUrl();
            if( sData['type'] == 'edit' ){
                this.searchCusList=false;
                //编辑，需要请求回显数据
                var param={
                    id: sData['id'] //资产配置，非必传
                }
                this.getCustomerAssetDetailByCusOrId(param);

            }else if (sData['type'] == 'cus'){
                this.searchCusList=false;
                this.getUser();
            }else{
                //新建通过用户名获取回显数据
                var param={
                    customerName:this.formData.customerName, //客户姓名
                    customerSource:this.formData.customerSource, //客户来源
                    customerNo:this.formData.customerNo
                }
                this.getCustomerAssetDetailByCusOrId(param);
            }
        },
        //获取字典
        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                needFailCallback:false,
                data:["1000","1001","1002","1003","1004","1005","1006","1007"]

            }, (res) => {
               /* 1000是与否
                1001生命周期阶段
                1002客户风险承受能力
                1003资产分类
                1004资产类别
                1005项目类型
                1006细分策略
                1007家庭未来现金流稳定性*/

                this.lifeTermDic=res.data.data[1001];
                this.cashStableDic=res.data.data[1007];
                this.riskTypeDic=res.data.data[1002];
                this.isJustNeedDic=res.data.data[1000];
                this.isInvestNeedDic=res.data.data[1000];

                //判断当前页面是作为新建还是编辑
                var type = splitUrl()['type'];
                if( type == 'edit'|| type == 'cus'){
                    //编辑或者从客户入口进入时，需要请求回显数据
                    this.getData();
                }

            }, res => {
               
            })

        },
        //格式化字典
        parseDicArr(dicData) {

            var dicArr = [];
            for (var i = 0; i < dicData.length; i++) {

                dicArr.push({value: dicData[i].keyNo,text: dicData[i].keyValue});
            }
            return dicArr;

        },
        //打开客户弹窗
        openCusList(){
            if (this.searchCusList) {
                this.$refs.searchCusList.open();
            }
            
        },
        //选择客户
        selectCus(item){
            if (this.searchCusList) {
                this.formData.customerName = item.customerName; //客户姓名
                this.formData.customerNo = item.customerId; //客户编号
                this.formData.customerSource = item.customerSource; //客户来源
                this.formData.empNo= item.empNo; //理顾编号
                //获取用户原配置信息
                this.getData();
            }
           
        },
        //打开生命周期弹窗
        openlifeTerm(ev) {
            $(".ipt").blur();
            var e = ev || window.event;
            var t=$(e.target);
            popPicker.pickerSelect(this.parseDicArr(this.lifeTermDic),res=>{
                this.lifeTermText=res[0].text;
                this.formData.lifeTerm=res[0].value;
            });
           
        },
        //打开家庭未来现金流稳定性弹窗
        opencashStable() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.parseDicArr(this.cashStableDic),res=>{
                this.cashStableText=res[0].text;
                this.formData.cashStable=res[0].value;
            });
        },
        //打开客户风险承受能力弹窗
        openriskType() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.parseDicArr(this.riskTypeDic),res=>{
                this.riskTypeText=res[0].text;
                this.formData.riskType=res[0].value;
            });
        },
        //打开是否有海外刚需型资产配置需求弹窗
        openisJustNeed() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.parseDicArr(this.isJustNeedDic),res=>{
                this.isJustNeedText=res[0].text;
                this.formData.isJustNeed=res[0].value;
            });
        },
        //打开是否有海外可投资型资产配置需求 弹窗
        openisInvestNeed() {
            $(".ipt").blur();
            popPicker.pickerSelect(this.parseDicArr(this.isInvestNeedDic),res=>{
                this.isInvestNeedText=res[0].text;
                this.formData.isInvestNeed=res[0].value;
            });
        },
        //下一步点击事件
        submitForm(){
            
            var that = this;

            for(var key in this.formData){ 
                if(this.formData[key]=="" && this.formData[key]!=0){
                    this.formData[key]=null
                }
            }

            //使用json.stringify转换对象会丢失值为空的或是null的
            //对象深拷贝使用objDeepCopy方法
            var $formData = this.$utils.objDeepCopy(this.formData);
            var $validFormElements = this.$utils.objDeepCopy(this.validFormElements);
            
            if ( this.formData.isJustNeed == "0" || this.formData.isJustNeed == null) {
                //海外刚需型资产配置需求没有选或选否的时候，去掉表单和校验的海外配置金额字段
                delete $formData.overseasAmount;
                delete $validFormElements.overseasAmount;
            }else{
                //海外配置金转化为万元
                $formData.overseasAmount = this.$utils.toOne($formData.overseasAmount)
            }
            //可配置金转化为万元
            $formData.canConfigAssets = this.$utils.toOne($formData.canConfigAssets);
            //校验表单数据是否填写
            var formCusValid = this.$utils.newFormElValid($formData,$validFormElements);

            if(!formCusValid){

                this.formValid = false;
                return;
            }

            //可配置资产，月度固定开支和海外资产
            var total = Number($formData.overseasAmount) + Number($formData.fixedCost);

            if ( total > Number($formData.canConfigAssets) ){
                tipAction("请重新填写可配置资产，月度固定开销和海外资产配置金额；若刚需型资产配置总和（保险+货币类基金+海外）大于客户可配置资产则无法显示配置结果",()=>{},5000);
                return false;
            }

            //先判断按钮是否可点击
            if ( that.isClick ){
                return false;
            }

            //请求接口前，将按钮设为不可点击
            that.isClick = true;
            
            that.$axiosHttp.http({
                name:'新建资产第一步保存',
                url: apiUrl.saveCustomerAssetFirstStepApi,
                needFailCallback: true,
                params: $formData
            }, (res) => {
               
                //tipAction(res.data.message,()=>{
                    //跳转第二步
                    that.formData.assetConfigId=res.data.data.assetConfigId;
                    that.formData.oldAssetConfigId=res.data.data.oldAssetConfigId;
                    var url = goUrl.assetsStatusUrl+'?assetConfigId='+res.data.data.assetConfigId+'&oldAssetConfigId='+res.data.data.oldAssetConfigId+'&customerName='+that.formData.customerName;
                    var type = splitUrl()['type'];
                    if( type == 'edit' ){
                        //编辑
                        url += '&type=edit';
                    }
                    window.location.href = url;
                    that.isClick = false;

            }, (res) => {
               tipAction(res.data.message);
               that.isClick = false;
            })
        },
        //只能输入整数
        NumberCheck(t){
            t=t.replace(/\D/g,'');
            if (t.length>1&&t.substring(0,1)==0) {
                t=0

            }
            return t
        },
         //删除多次生成的mui-poppicke
        removePickerDom(){
            var pickerDom=$(".mui-poppicker");
            if (pickerDom.length!=0) {
                $(".mui-poppicker").remove();
            }
        },
        //获取用户
        getUser(){
            this.$axiosHttp.http({
                name:'获取用户',
                url: apiUrl.searchCustomerListApi,
                needFailCallback:false,
                params: {
                    customerName:decodeURI(splitUrl()['customerName']),
                    pageNum:1,
                    pageSize:10,
                }
            }, (res) => {
                var data = res.data.data[0];

                //保存客户customerName
                this.formData.customerName = data.customerName; //客户姓名
                this.formData.customerNo = data.customerId; //客户编号
                this.formData.customerSource = data.customerSource; //客户来源
                this.formData.empNo= data.empNo; //理顾编号
                var param={
                    customerName:this.formData.customerName, //客户姓名
                    customerSource:this.formData.customerSource, //客户来源
                    customerNo:this.formData.customerNo
                }
                this.getCustomerAssetDetailByCusOrId(param)
            }, res => {
               
            })

        },
        //获取回显
        getCustomerAssetDetailByCusOrId(param){

            this.$axiosHttp.http({
                name:'获取回显数据',
                url: apiUrl.getCustomerAssetDetailByCusOrIdApi,
                needFailCallback:true,
                params: param
            }, (res) => {
                var data = res.data.data;

                //回显数据
                this.formData.customerName = !!data.customerName ? data.customerName : this.formData.customerName;
                this.formData.customerNo = !!data.customerNo ? data.customerNo : this.formData.customerNo;
                this.formData.customerSource = !!data.customerSource ? data.customerSource : this.formData.customerSource;
                this.formData.canConfigAssets = this.$utils.toThousand(data.canConfigAssets);
                this.formData.oldAssetConfigId = data.id;
                
                //生命周期阶段
                this.formData.lifeTerm = data.lifeTerm ;

                var lifeArr = this.lifeTermDic.filter(function(el){
                    return el.keyNo == data.lifeTerm
                });
                //(lifeArr.length ) && ( this.lifeTermText = lifeArr[0].keyValue );
                this.lifeTermText=(lifeArr.length )?lifeArr[0].keyValue : null;

                this.formData.fixedCost = data.fixedCost;

                //现金流稳定性
                this.formData.cashStable = data.cashStable ;
                var cashArr = this.cashStableDic.filter(function(el){
                    return el.keyNo == data.cashStable
                });
                //(cashArr.length ) && ( this.cashStableText = cashArr[0].keyValue );
                this.cashStableText=(cashArr.length )?cashArr[0].keyValue : null;
                //风险承受能力
                this.formData.riskType = data.riskType ;
                var riskArr =  this.riskTypeDic.filter(function(el){
                    return el.keyNo == data.riskType
                });
                //(riskArr.length ) && (this.riskTypeText = riskArr[0].keyValue );
                this.riskTypeText=(riskArr.length )?riskArr[0].keyValue : null;

                //刚需性需求
                this.formData.isJustNeed = data.isJustNeed ;
                var isJustArr = this.isJustNeedDic.filter(function(el){
                    return el.keyNo == data.isJustNeed
                });
                //(isJustArr.length ) && ( this.isJustNeedText = isJustArr[0].keyValue );
                this.isJustNeedText=(isJustArr.length )?isJustArr[0].keyValue : null;



                this.formData.overseasAmount = this.$utils.toThousand(data.overseasAmount);

                //可投资性配置需求
                this.formData.isInvestNeed = data.isInvestNeed ;
                var isInvestArr = this.isInvestNeedDic.filter(function(el){
                    return el.keyNo == data.isInvestNeed
                });
                //(isInvestArr.length ) && ( this.isInvestNeedText = isInvestArr[0].keyValue );
                this.isInvestNeedText=(isInvestArr.length )?isInvestArr[0].keyValue : null;


            }, res => {
               this.resetData()
            })
        },
        //还原表单数据
        resetData(){
            this.formData.canConfigAssets = null;
            this.formData.oldAssetConfigId = null;
            
            //生命周期阶段
            this.formData.lifeTerm = null;
            this.lifeTermText = null;

            this.formData.fixedCost = null;

            //现金流稳定性
            this.formData.cashStable = null;
           
            this.cashStableText = null;
            //风险承受能力
            this.formData.riskType = null;
            
            this.riskTypeText=null;

            //刚需性需求
            this.formData.isJustNeed = null;
           
            this.isJustNeedText = null;



            this.formData.overseasAmount =null;

            //可投资性配置需求
            this.formData.isInvestNeed = null ;
            
            this.isInvestNeedText = null;
        }

    }
};
</script>