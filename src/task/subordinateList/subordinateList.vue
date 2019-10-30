<!-- 
    我的下属任务列表页
 -->
<template>
    <section class="subordinateList page">
        <div class="listWrap">
        </div>
        <!-- 待提交/未确认/已确认弹层模板 -->
        <template>
            <ul class="" id="tableList" v-show="false">
                <li class="dataList" v-for="(data,index) in listData" :key="index" :taskId="data.taskId">
                    <page-title :title="data.taskName" :rankNum="data.rankNum"></page-title>
                    <!-- 时间显示 -->
                    <time-display :tdData="data"></time-display>
                    <!-- 列表展示,未开始不展示 -->
                    <list-typeFive :listTypeFiveData="data | dealFiveData" v-if="data.type!=1"></list-typeFive>
                    <!-- 进行中展示进度条 -->
                    <progress-component :progressComponentData="data | pcData" v-if="data.type==2"></progress-component>
                </li>
            </ul>
        </template>
        <loading :showLoading="showLoading"></loading>
        <no-data :showNoData="showNoData" show="show"></no-data>
    </section>
</template>
<script>
import "./subordinateList.less";

import tipAction from "@common/components/otherComponents/tipAction/tipAction"
// tab切换上拉加载，下拉刷新
import pullUpDown from "@src/common/pullUpDown/pullUpDown.js"
// 进度条
import progressComponent from "@src/common/progressComponent/progressComponent"
// 列表展示
import listTypeFive from "@src/common/listType/listTypeFive/listTypeFive"
// 右边图标列表展示
import listTypeSix from "@src/common/listType/listTypeSix/listTypeSix"
// 页面标题
import pageTitle from "@src/common/titleType/pageTitle/pageTitle"
// 暂无数据
import noData from '@src/common/noData/noData'
// 时间展示
import timeDisplay from "@src/task/common/list/timeDisplay"

import listOperate from "@src/task/common/mixins/listOperate.js"




export default {
    name: "subordinateList",
    mixins: [pullUpDown, listOperate],
    components: {
        progressComponent: progressComponent,
        timeDisplay: timeDisplay,
        listTypeFive: listTypeFive,
        listTypeSix: listTypeSix,
        pageTitle: pageTitle,
        noData: noData,
    },
    data() {
        return {
            tabList: [], //导航
            tabIndex: 0,
            dynamicTab: true, // 动态加载tabList
        };
    },
    created() {
        //配置接口参数
        this.getTagList();
    },
    computed:{
        httpConfig:function(){ // 列表请求可变参数
            var val = this.tabIndex;
            var a = {
                key: 'subLevel',
                val: this.tabList[val].code
            };
            return [a];
        }
    },
    methods: {
        getTagList() {
            this.$axiosHttp.http({
                name: '我的下属标签列表',
                url: apiUrl.queryMySubLevelTagListApi,
                needFailCallback: true,
            }, (res) => {
                this.tabList = res.data.data;

                //配置下属任务列表接口参数
                this.httpUrl = apiUrl.queryMySubLevelTaskListApi;

                // 初始化标签
                this.tabScroll();


            }, res => { // 没有数据
                this.showLoading = false;
                this.showNoData = true;
            })

        },
    }
};

</script>
