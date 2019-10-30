<template>
    <div class="formSection">
        <ul class="list">
            <li class="item hasUnit">
                <label class="lb">保险产品金额</label>
                <div class="unit">万元</div>
                <input v-model="formData.insurAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.insurAmountNow=NumberCheck(formData.insurAmountNow)" />
            </li>
             <li class="item hasUnit">
                <label class="lb">货币基金金额</label>
                <div class="unit">万元</div>
                <input v-model="formData.currentAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.currentAmountNow=NumberCheck(formData.currentAmountNow)" />
            </li>
             <li class="item hasUnit">
                <label class="lb">固收（债权）产品金额</label>
                <div class="unit">万元</div>
                <input v-model="formData.bondAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10" @change="formData.bondAmountNow=NumberCheck(formData.bondAmountNow)" />
            </li>
            <li class="item hasUnit">
                <label class="lb">浮收产品金额</label>
                <div class="unit">万元</div>
                <input v-model="formData.floatAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.floatAmountNow=NumberCheck(formData.floatAmountNow)"/>
            </li>
            <li class="item hasUnit hasRemarks">
                <label class="lb">
                    <span>刚需型海外产品金额</span>
                    <br/>
                    <span class="gray">(海外置业、移民、留学)</span>
                </label>
                <div class="unit">万元</div>
                <input v-model="formData.justAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10"  @change="formData.justAmountNow=NumberCheck(formData.justAmountNow)" />
            </li>
            <li class="item hasUnit hasRemarks">
                <label class="lb">
                    <span>可投资型海外产品金额</span>
                    <br/>
                    <span class="gray">(海外私募、公募产品)</span>
                </label>
                <div class="unit">万元</div>
                <input v-model="formData.investAmountNow" class="ipt" type="text" placeholder="请输入" maxlength="10" @change="formData.investAmountNow=NumberCheck(formData.investAmountNow)" />
            </li>
        </ul>
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>

    </div>        
</template>

<script>
import "./assetsStatus.less";

import "./assetsStatus.js";

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "assetsStatus",
    components:{
        bottomFixedbutton,
    },
    data() {
        return {
            bottomFixedbuttonText:'下一步',
            validFormElements:{
                "insurAmountNow":"请输入保险产品配置金额",
                "currentAmountNow":"请输入货币基金配置金额",
                "justAmountNow":"请输入刚需型海外产品配置金额",
                "investAmountNow":"请输入可投资型海外产品配置金额",
                "bondAmountNow":"请输入固收（债权）产品配置金额",
                "floatAmountNow":"请输入浮收产品配置金额"
            },
            formData:{
                assetConfigId:null,
                insurAmountNow:null,
                currentAmountNow:null,
                justAmountNow:null,
                investAmountNow:null,
                bondAmountNow:null,
                floatAmountNow:null
            },
            isClick: false, //控制按钮点击
        };
    },
    created: function() { 
       
        //回显数据，oldAssetConfigId为空不需要请求回显
        if (splitUrl()['oldAssetConfigId']=="null") {
            return false
            
        }
        this.getData();
    },
    methods: {
        //获取回显数据
        getData(){
            this.$axiosHttp.http({
                name:'获取回显数据',
                url: apiUrl.getCustomerAssetConfigListByIdApi,
                needFailCallback:false,
                params: {
                    oldAssetConfigId:splitUrl()['oldAssetConfigId']//从第一步带过来的id
                }
            }, (res) => {
                var data = res.data.data;
                
                for (var i = 0; i < data.length; i++) {
                    var assetType=data[i].assetType;
                    switch(assetType){
                    case 104:
                        this.formData.insurAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break;
                    case 106:
                        this.formData.currentAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break;
                    case 107:
                        this.formData.bondAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break;
                    case 108:
                        this.formData.floatAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break;
                    case 109:
                        this.formData.investAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break; 
                    case 110:
                        this.formData.justAmountNow=this.$utils.toThousand(data[i].assetNow)
                        break;                   
                    }
                }
                
            }, res => {
               
            })
        },

        //提交表单
        submitForm(){

            var that = this;

            for(let key in this.formData){ 
               if(this.formData[key]==""){
                 this.formData[key]=null
               }
            }
            /*104:保险产品
            106:货币类基金
            107:固收投资产品
            108:浮收投资产品
            109:可投资型海外产品
            110:刚需型海外产品*/
            let paramsData=[];
            if (this.$utils.toOne(this.formData.insurAmountNow)) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:104,
                    assetNow:this.$utils.toOne(this.formData.insurAmountNow)
                })
            }
            if (this.$utils.toOne(this.formData.currentAmountNow)) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:106,
                    assetNow:this.$utils.toOne(this.formData.currentAmountNow)
                })
            }
            if (this.$utils.toOne(this.formData.bondAmountNow) ) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:107,
                    assetNow:this.$utils.toOne(this.formData.bondAmountNow)
                })
            }
            if (this.$utils.toOne(this.formData.floatAmountNow)) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:108,
                    assetNow:this.$utils.toOne(this.formData.floatAmountNow)
                })
            }
            if (this.$utils.toOne(this.formData.investAmountNow)) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:109,
                    assetNow:this.$utils.toOne(this.formData.investAmountNow)
                })
            }
            if (this.$utils.toOne(this.formData.justAmountNow)) {
                paramsData.push({
                    assetConfigId:splitUrl()['assetConfigId'],
                    assetType:110,
                    assetNow:this.$utils.toOne(this.formData.justAmountNow)
                })
            }
            //如果用户全部没有填写则不请求接口，直接跳转到第三步
            if (paramsData.length==0) {

                //跳转第三步
                var url = goUrl.configureUrl+'?assetConfigId='+splitUrl()['assetConfigId']+'&customerName='+splitUrl()['customerName'];
                var type = splitUrl()['type'];
                if( type == 'edit' ){
                    //编辑
                    url += '&type=edit';
                }
                window.location.href = url;
                return false;
            }

            //请求接口前，将按钮设为不可点击
            if ( that.isClick ){
                return false;
            }
            that.isClick = true;

            that.$axiosHttp.http({
                    name:'提交新建客户陪访',
                    url: apiUrl.saveCustomerAssetSecondStepsApi,
                    needFailCallback: true,
                    data: paramsData
            }, (res) => {
               
                //tipAction(res.data.message,()=>{
                    //跳转第三步
                    var url = goUrl.configureUrl+'?assetConfigId='+res.data.data.assetConfigId+'&customerName='+splitUrl()['customerName'];
                    var type = splitUrl()['type'];
                    if( type == 'edit' ){
                        //编辑
                        url += '&type=edit';
                    }
                    window.location.href = url;
                    that.isClick = false;
                //});
            }, (res) => {
               tipAction(res.data.message);
               that.isClick = false;
            })
            
            
            
        },
        NumberCheck(t){
            t=t.replace(/\D/g,'');
            if (t.length>1&&t.substring(0,1)==0) {
                t=0

            }
            return t
        }
        
    }
};
</script>