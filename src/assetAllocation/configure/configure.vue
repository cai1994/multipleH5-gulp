<template>
    <div>
        <ul class="dropDownList" ref="dropDownList">
            <li class="item" v-for="(el,index) in listData" >
                <div class="header" @click="changeStatus(el)">
                    <p class="scale">
                        <span class="orangeline"></span>
                        <span class="orange size32 mar-l-20">{{el.countRadtio}}%</span>
                        <span class="size30 cl-3c3c3c mar-l-20">{{el.assetClassifyText}}</span>
                        <span class="size30 cl-999 mar-l-10">({{el.assetTypeText}})</span>
                    </p>
                    <p class="money cl-666">配置金额：{{el.assetRecommend}}元</p>
                    <i  :class="el.isFold ? 'iconfont dropDownBtn up' : 'iconfont dropDownBtn down'"
                        :data-assetconfigid="el.assetConfigId" >
                    </i>
                </div>
                <div class="fold" v-show="el.isFold">
                    <div class="foldItem" v-for="(item,itemIndex) in el.items">
                        <div class="title"><span class="cl-3c3c3c">推荐</span><span class="cl-666"> {{item.productTypeText}}、{{item.subdivisionStrategyText}}</span></div>
                        <ul class="foldItemList">
                            <li class="listItem" v-for="(listItem,listItemIndex) in item.products">
                                <div class="productName">
                                    <i   :class="listItem.ischeck ? 'iconfont checkbox checked' : 'iconfont checkbox noCheck'" 
                                        :data-id="listItem.id"
                                        @click="checkbox(listItem)">
                                        
                                    </i><span class="mar-l-28 cl-666">{{listItem.projectName}}</span>
                                </div>
                                <div class="productDetails cl-999">{{listItem.projectAbbreviation}}</div>
                            </li>
                        </ul>
                    </div>
                </div>          
            </li>
        </ul> 
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>    
    </div>
</template>

<script>
//import Vue from 'vue';
import "./configure.less";

import "./configure.js";
import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton';
import tipAction from "@common/components/otherComponents/tipAction/tipAction"

export default {
    name: "configure",
    components:{
        bottomFixedbutton,
    },
    data() {
        return {
            bottomFixedbuttonText:'生成报告',
            listData:[],
            assetClassifyDic:[],
            assetTypeDic:[],
            productTypeDic:[],
            subdivisionStrategyDic:[],
            projectId:[],
            tableData:[],
            isClick: false
        };
    },
    created: function() {   
        this.getDic();

    },
    mounted(){
        
    },
    methods: {
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

                this.assetClassifyDic=res.data.data[1003];
                this.assetTypeDic=res.data.data[1004];
                this.productTypeDic=res.data.data[1005];
                this.subdivisionStrategyDic=res.data.data[1006];
                this.getAssetTypeList();

            }, res => {
               
            })

        },
        getAssetTypeList(){
            this.$axiosHttp.http({
                    name:'第三步获取资产分类列表',
                    url: apiUrl.getAssetTypeListApi,
                    needFailCallback:true,
                    params: {assetConfigId:splitUrl()['assetConfigId']}
            }, (res) => {

                this.listData=Object.assign(res.data.data, this.listData);

                this.listData.forEach((course, courseIndex, array) =>{
                    course.assetRecommend=this.comdify(course.assetRecommend)+".00";
                    for (var i = 0; i < this.assetClassifyDic.length; i++) {//资产分类
                        var obj =this.assetClassifyDic[i];
                        if(obj.keyNo==course.assetClassify){
                            this.$Vue.set(course, 'assetClassifyText', obj.keyValue);
                        } 
                    }

                    for (var i = 0; i < this.assetTypeDic.length; i++) {//资产类别
                        var obj =this.assetTypeDic[i];
                        if(obj.keyNo==course.assetType){
                            this.$Vue.set(course, 'assetTypeText', obj.keyValue);
                        } 
                    }
                    
                    
                    //this.$Vue.set(course, 'isHttp', true);
                    this.$Vue.set(course, 'items', []);
                    this.$axiosHttp.http({
                        name:'根据资产类别查询推荐产品',
                        url: apiUrl.selectAssetRecommendProductByAssetTypeApi,
                        needFailCallback:true,
                        params: {
                            assetConfigId:splitUrl()['assetConfigId'],
                            assetType:course.assetType
                        }
                    }, (res) => {
                        course.items=Object.assign(res.data.data, course.items);
                        if (course.items.length==0) {
                            return false;

                        }
                        this.$Vue.set(course, 'isFold', false);
                        course.items.forEach((course, courseIndex, array) =>{

                            for (var i = 0; i < this.productTypeDic.length; i++) {//推荐产品类型
                                var obj =this.productTypeDic[i];
                                if(obj.keyNo==course.productType){
                                    this.$Vue.set(course, 'productTypeText', obj.keyValue);
                                } 
                            }

                            for (var i = 0; i < this.subdivisionStrategyDic.length; i++) {//推荐产品细分策略
                                var obj =this.subdivisionStrategyDic[i];
                                if(obj.keyNo==course.subdivisionStrategy){
                                    this.$Vue.set(course, 'subdivisionStrategyText', obj.keyValue);
                                } 
                            }
                            for (var i = 0; i < course.products.length; i++) {
                                this.$Vue.set(course.products[i], 'ischeck', true);
                            }
                           
                        })
                    }, res => {
                       
                    }) 

                })
               

            }, res => {
            
            })
        },
        comdify: function(n) {
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
        changeStatus(el){
            if (el.isFold) {
                el.isFold=false;
            }else{
                el.isFold=true;
                //请求接口,改为初始化一次性加载出来
                /*if (el.isHttp) {
                    this.$axiosHttp.http({
                        name:'根据资产类别查询推荐产品',
                        url: apiUrl.selectAssetRecommendProductByAssetTypeApi,
                        needFailCallback:false,
                        params: {
                            assetConfigId:splitUrl()['assetConfigId'],
                            assetType:el.assetType
                        }
                    }, (res) => {
                        el.isFold=true;
                        el.isHttp=false;
                        el.items=Object.assign(res.data.data, el.items);
                        el.items.forEach((course, courseIndex, array) =>{

                            for (var i = 0; i < this.productTypeDic.length; i++) {//推荐产品类型
                                var obj =this.productTypeDic[i];
                                if(obj.keyNo==course.productType){
                                    this.$Vue.set(course, 'productTypeText', obj.keyValue);
                                } 
                            }

                            for (var i = 0; i < this.subdivisionStrategyDic.length; i++) {//推荐产品细分策略
                                var obj =this.subdivisionStrategyDic[i];
                                if(obj.keyNo==course.subdivisionStrategy){
                                    this.$Vue.set(course, 'subdivisionStrategyText', obj.keyValue);
                                } 
                            }
                            for (var i = 0; i < course.products.length; i++) {
                                this.$Vue.set(course.products[i], 'ischeck', true);
                            }
                           
                        })
                    }, res => {
                       
                    }) 
                }else{
                    el.isFold=true;
                }*/
            }
        },

        checkbox(listItem){
            if (listItem.ischeck) {
                listItem.ischeck=false;
            }else{
                listItem.ischeck=true;
            }
        },
        submitForm(){
            var that = this;

            this.projectId.length=0;
            let els = this.$refs.dropDownList.querySelectorAll('.checked');
            for (let i = 0; i < els.length; i++) {
                
                this.projectId.push(els[i].getAttribute('data-id'));
            }
            if (this.projectId.length==0) {
                tipAction("请选择配置产品");
                return false;
            }

            //请求接口前，将按钮设为不可点击
            if ( that.isClick ){
                return false;
            }
            that.isClick = true;

            that.$axiosHttp.http({
                name:'新建资产生成报告',
                url: apiUrl.addAssetConfigReportApi,
                needFailCallback: true,
                data: {
                    id:splitUrl()['assetConfigId'],
                    projectIds:that.projectId
                }
            }, (res) => {
                //tipAction(res.data.message,()=>{

                window.location.href = goUrl.recommendationUrl+'?assetConfigId='+splitUrl()['assetConfigId']
                +'&customerName='+splitUrl()['customerName'];
                that.isClick = false;
                //});
            }, (res) => {
               tipAction(res.data.message);
               that.isClick = false;
            }) 
            
        }
    }
};
</script>