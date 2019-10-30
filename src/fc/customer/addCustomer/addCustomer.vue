<template>
    <div class="pageWrapperAdd">
        <ul class="list">
            <li class="item itemSelect">
                <label class="lb">陪谈理顾</label>
                <span  :class="formData.empName ? 'placeholder' : 'placeholder tipCor'"  @click="openEmpList()">
                    <template v-if="formData.empName">
                        {{formData.empName}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openEmpList()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb">拜访日期</label>
                <span  :class="formData.viewDate ? 'placeholder' : 'placeholder tipCor'" @click="openDtPicker()">
                    <template v-if="formData.viewDate">
                        {{formData.viewDate}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openDtPicker()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb">客户名称</label>
                <span  :class="formData.custName ? 'placeholder' : 'placeholder tipCor'"  @click="openCusList()">
                    <template v-if="formData.custName ">
                         {{formData.custName}}
                    </template>
                     <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openCusList()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb">客户性质</label>
                <span  :class="custTypeText ? 'placeholder' : 'placeholder tipCor'"  @click="openCustomType()">
                    <template v-if="custTypeText">
                        {{custTypeText}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openCustomType()"></i>
            </li>

            <li class="item" style="position: relative;">
                <label class="lb">投资金额</label>

                <input v-model="formData.investAmount" class="ipt" type="text" placeholder="请输入" maxlength="12" style="width: 55%;position: absolute;right: 10%;" />
                <input class="ipt" style="display: inline-block;width: 30px;position: absolute;right: 0px;color: #666;background-color: #fff;" value="万" disabled>
                <!--<label class="unit" style="display: inline-block;width: 30px;height: 30px;">万</label>-->
            </li>
            <li class="item itemSelect">
                <label class="lb">投资到账时间</label>
                <span  :class="formData.investPayDate ? 'placeholder' : 'placeholder tipCor'" @click="openDtPickerPayDate()">
                    <template v-if="formData.investPayDate">
                        {{formData.investPayDate}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openDtPickerPayDate()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb">访谈地址</label>
                <span  :class="formData.interviewPlace ? 'placeholder' : 'placeholder tipCor'"  @click="openInterviewPlace()">
                    <template v-if="formData.interviewPlace">
                        {{interviewPlace}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openInterviewPlace()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb" style="width: 40%;">是否提出下次见面</label>
                <span  :class="formData.isMeet ? 'placeholder' : 'placeholder tipCor'" style="width: 55%;" @click="openIsMeet()">
                    <template v-if="formData.isMeet">
                        {{isMeet}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openIsMeet()"></i>
            </li>

            <li class="item">
                <label class="lb">拜访对象</label>
                <input v-model="formData.viewObject" class="ipt" type="text" placeholder="请输入" maxlength="50" />
            </li>
            <li class="item">
                <label class="lb">联系方式</label>
                <input v-model="formData.contactWay" class="ipt" type="text" placeholder="请输入" maxlength="50" />
            </li>
            <!--<li class="item">-->
                <!--<label class="lb">第几次拜访</label>-->
                <!--<input v-model="formData.viewTime" class="ipt"  type="number" pattern="[0-9]*"  oninput='if(value.length>2)value=value.slice(0,2)' placeholder="请输入"/>-->
            <!--</li>-->
            <li class="item itemTextArea">
                <label class="lb lbLong">行业及主营业务</label>
            </li>
            <textarea v-model="formData.industry" class="txtArea" type="text" placeholder="请输入..." maxlength="100" />
            <li class="item itemTextArea">
                <label class="lb">拜访详情</label>
            </li>
            <textarea v-model="formData.viewDetail" class="txtArea" type="text" placeholder="请输入..." maxlength="100" />
        </ul>
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>

        <!-- 陪谈理顾弹框开始 -->
        <search-list  ref="searchEmpList" @selectEmp="selectEmp" :httpUrl="empUrl" :type="empflag"></search-list>
        <!-- 陪谈理顾弹框结束 -->
        
        <!-- 客户弹框开始 -->
        <search-list  ref="searchCusList" @selectCus="selectCus" :httpUrl="cusUrl" :type="cusflag" :empNo="formData.empCode"></search-list>
        <!-- 客户弹框结束 -->

    </div>        
</template>

<script>
import "./addCustomer.less";

import "./addCustomer.js";

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import searchList from '@src/common/searchList/searchList'

//MUI日历和下拉菜单
import popPicker from '@src/common/mui/popPicker/popPicker.js'
import '@common/less/mui/resetMuiPop.less';

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "addCustomer",
    components:{
        bottomFixedbutton,
        searchList
    },
    data() {
        return {
            bottomFixedbuttonText:'保存',
            validFormElements:{
                "empName":"请选择陪谈理顾",
                "empCode":"请选择陪谈理顾",
                "viewArea":"请选择陪谈区域",
                "areaCode":"请选择陪谈区域",
                "viewDate":"请输入拜访日期",
                "custName":"请选择客户",
                "contactWay":"请输入联系方式",
                "viewObject":"请输入拜访对象",
                "viewTime":"请输入第几次拜访",
                "investAmount": "请输入投资金额",
                "investPayDate": "请选择投资到账时间",
                "interviewPlace": "请选择访谈地点",
                "isMeet": "请选择是否提出下次见面",
            },
            formData:{
                empName:null,
                empCode:null,
                viewArea:null,
                areaCode:null,
                viewTime:1,
                custId:null,
                custName:null,
                customerType:null,
                custType:null,
                industry:null,
                viewObject:null,
                viewPrice:null,
                contactWay:null,
                viewDate: null,
                viewDetail:null,
                customerSource: null,
                investAmount: null, //投资金额
                investPayDate: null, //投资到账时间
                interviewPlace: null, //访谈地点
                isMeet: null, //是否提出下次见面
            },
            customPlaceHolder:true,//请选择提示文字颜色
            custTypeText:null,//文本
            interviewPlace:null,//访谈地点文本
            isMeet:null,//是否提出下次见面文本
            formValid:true,
            searchValue:null,
            empUrl:null,
            empData: [],//陪谈理顾列表数据
            cusUrl:null,
            cusflag:'cusflag',
            empflag:'empflag',
            cusData: [],//客户列表数据
            custTypeDict:[], //客户性质字典
            interviewPlaceDict:[], //访谈地点字典
            isMeetDict: [
                {dicKey: "1", dicValue: "是"},
                {dicKey: "0", dicValue: "否"}
            ],
            contactWayTip: '请输入正确格式的联系方式',
            investAmountTip: '投资金额：请输入小于等于12位非零开头的整数',

        };
    },
    created: function() {

        this.empUrl = apiUrl.selectEmpListByCodeOrNameApi;

        this.cusUrl = apiUrl.selectCustListByCustNameApi;

        this.getDictData('custType');
        this.getDictData('interviewPlace');

    },
    methods: {

        //获取字典值
        getDictData(value) {
            this.$utils.getDicData(value,res => {
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        this[key + "Dict"] = res[key] || [];
                    }
                }
            });
        },

        //打开陪谈理顾弹窗
        openEmpList(){

             this.$refs.searchEmpList.open( this.$refs.searchEmpList.$el );

        },
       
        //打开客户弹窗
        openCusList(){

            this.$refs.searchCusList.open( this.$refs.searchCusList.$el );

        },
      
        //选择理顾
        selectEmp(item){
           this.formData.empName = item.name; //理顾姓名
           this.formData.empCode = item.code; //理顾工号
           this.formData.viewArea = item.deptName; //部门编号
           this.formData.areaCode = item.deptCode; //部门名称
        },

        //选择客户
        selectCus(item){
           this.formData.custName = item.customerName; //客户姓名
           this.formData.custId = item.customerId; //客户工号
           this.formData.customerType = item.customerType; //客户类型
           this.formData.customerSource = item.customerSource; //客户类型
        },
         
        //拜访日期MUI
        openDtPicker(){
            console.log({type:'date'})
            popPicker.pickerDate({type:'date'},res=>{
                this.formData.viewDate = res.text;
            });
        },
        //投资到账时间
        openDtPickerPayDate(){
            console.log({type:'date'})
            popPicker.pickerDate({type:'date'},res=>{
                this.formData.investPayDate = res.text;
            });
        },

        //客户性质MUI
        openCustomType() {
            console.log(this.$utils.parseDicArr(this.custTypeDict))
            popPicker.pickerSelect(this.$utils.parseDicArr(this.custTypeDict),res=>{
                this.custTypeText = res[0].text;
                this.formData.custType = res[0].value;
            });
        },

        //访谈地点
        openInterviewPlace() {
            console.log(this.$utils.parseDicArr(this.interviewPlaceDict))
            popPicker.pickerSelect(this.$utils.parseDicArr(this.interviewPlaceDict),res=>{
                this.interviewPlace = res[0].text;
                this.formData.interviewPlace = res[0].value;
            });
        },

        //是否提出下次见面
        openIsMeet() {
            console.log(this.$utils.parseDicArr(this.isMeetDict))
            popPicker.pickerSelect(this.$utils.parseDicArr(this.isMeetDict),res=>{
                this.isMeet = res[0].text;
                this.formData.isMeet = res[0].value;
            });
        },

        //提交表单
        submitForm(){
            //数据不能为空校验
            let formCusValid = this.$utils.formElValid(this.formData,this.validFormElements);
            if(!formCusValid){

                this.formValid = false;
                return;
            }

            //联系方式校验
            let telValid = this.$utils.telNumberValid(this.formData.contactWay, this.contactWayTip);
            if (!telValid) {
                return;
            }

            //投资金额校验
            let investAmountValid = this.$utils.priceRulesValid(this.formData.investAmount, this.investAmountTip);
            if (!investAmountValid) {
                return;
            }

            this.$axiosHttp.http({
                    name:'提交新建客户陪访',
                    url: apiUrl.addCustInterviewApi,
                    needFailCallback:false,
                    params: this.formData
            }, (res) => {
            
                tipAction(res.data.message,()=>{

                    window.location.href = goUrl.customerListUrl;

                });


            }, res => {
                
            })
            
            
            
        }
        
    }
};
</script>