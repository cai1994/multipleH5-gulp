<!-- 
    任务详情页
    @author songxiaoyu 2019-05-10
-->
<template>
    <div class="taskDetail">
        <!-- 头部 -->
        <page-title :title="taskName"></page-title>
        <!-- 倒计时 -->
        <div class="cdWrap" v-if="taskDetailData.residueTime">
            <span class="cdSpan">倒计时</span>
            <div class="cd_2">
                <count-down :cdData="taskDetailData.residueTime" v-if="taskDetailData.residueTime"></count-down>
            </div>
        </div>
        <!-- 排名 进行中和结束显示，未开始隐藏 -->
        <div class="tdRank" v-if="taskDetailData.type!=1" @click="jumpToRank">
            <img src="/task/static/img/rank_bg.png" alt="">
            <div class="tdr_1">
                <h3 class="tdr_2">当前排名第 <i class="tdr_3">{{taskDetailData.rankNum}}</i>名</h3>
                <template v-if="taskDetailData.type == 3">
                    <div class="tdr_4">任务已经结束啦！</div>
                </template>
                <template v-else>
                    <div class="tdr_4" v-if="taskDetailData.rankNum == 1">太棒了，已经是第一名了！</div>
                    <div  class="tdr_4" v-else>加油哦！距离上一名还差 <i class="tdr_5">{{taskDetailData.lastDifference}}</i></div>
                </template>
            </div>
        </div>
        <!-- 表单展示 -->
        <div class="ts">
            <form-display :formDisplayData="displayData"></form-display>
        </div>
        <!-- 上级任务 -->
        <description-list :descriptionListData="parentNameData"></description-list>
        <!-- 任务项目 -->
        <collapse-one :collapseOneData="projectData" collapseOneClass="pdInfo">
            <template v-slot:default="slotProps">
                <list-typeTwo :listTypeTwoData="slotProps.collapseObj" v-if="slotProps.collapseObj.data"></list-typeTwo>
                <list-typeEight :listTypeEightData="slotProps.collapseObj" v-else></list-typeEight>
            </template>
        </collapse-one>
        <!-- 任务描述 -->
        <description-list :descriptionListData="memoData"></description-list>
        <!-- 奖励机制 -->
        <collapse-one :collapseOneData="rewardListData">
            <template v-slot:default="slotProps">
                <list-TypeThree :listTypeThreeData="slotProps.collapseObj | dealRewardData"></list-TypeThree>
            </template>
        </collapse-one>
        <!-- 惩罚规则 -->
        <collapse-one :collapseOneData="punishListData">
            <template v-slot:default="slotProps">
                <list-TypeThree :listTypeThreeData="slotProps.collapseObj | dealPunishData"></list-TypeThree>
            </template>
        </collapse-one>
        <!-- 产品材料 -->
        <link-list :linkList="linkData"></link-list>
    </div>
</template>
<script>
// 页面样式
import "./taskDetail.less";
// 页面标题
import pageTitle from "@src/common/titleType/pageTitle/pageTitle"
// 表单展示区域
import formDisplay from "@src/common/formType/formDisplay/formDisplay"
// 解释性展示
import descriptionList from "@src/common/listType/descriptionList/descriptionList"
// 多行展示 
import mutilineDisplay from "@src/common/listType/mutilineDisplay/mutilineDisplay"
// 跳转列表
import linkList from "@src/common/listType/linkList/linkList"

import listTypeTwo from "@src/common/listType/listTypeTwo/listTypeTwo"
// 展开收起
import collapseOne from "@src/common/listType/collapseOne/collapseOne"
// 跟展开收起共同使用的list
import listTypeThree from "@src/common/listType/listTypeThree/listTypeThree"

import listTypeEight from "@src/common/listType/listTypeEight/listTypeEight"
// 倒计时
import countDown from "@src/common/countDown/countDown"

import listOperate from "@src/task/common/mixins/listOperate.js"

export default {
    name: "taskDetail",
    mixins: [listOperate],
    components: {
        pageTitle: pageTitle,
        formDisplay: formDisplay,
        descriptionList: descriptionList,
        mutilineDisplay: mutilineDisplay,
        linkList: linkList,
        listTypeTwo: listTypeTwo,
        listTypeThree: listTypeThree,
        listTypeEight: listTypeEight,
        collapseOne: collapseOne,
        countDown: countDown,
    },
    data() {
        return {
            taskId: splitUrl()['taskId'],
            taskName: '', // 任务名称 
            taskDetailData: {}, // 任务详情数据
            displayData: {}, // 表单展示数据
            memoData: {}, // 任务描述
            parentNameData: {}, // 上级任务
            projectData: {}, // 任务项目
            rewardListData: {}, //奖励数据
            punishListData: {}, // 惩罚数据
            linkData: {
                "产品资料": goUrl.taskFile + '?taskId=' + splitUrl()['taskId'],
                "子任务": goUrl.taskChildList + '?taskId=' + splitUrl()['taskId']
            },
        };
    },
    created: function() {
        this.getData();
    },
    filters: {
        dealRewardData: function(data) {
            return {
                listTypeThreeTitle: data.name,
                '奖励时间：': data.startTime + '至' + data.endTime,
                '奖励对象：': data.object,
                '奖励内容：': data.content,
            };
        },
        dealPunishData: function(data) {
            return {
                listTypeThreeTitle: data.name,
                '惩罚标准：': data.standard,
                '惩罚内容：': data.content,
            }
        }
    },
    computed: {

    },
    methods: {
        getData() {
            this.$axiosHttp.http({
                name: '任务详情接口',
                url: apiUrl.queryTaskDetailInfoApi,
                needFailCallback: false,
                params: {
                    taskId: splitUrl()['taskId']
                    // taskId: 21
                }
            }, (res) => {
                var data = res.data.data;
                var pd = this.dealTaskItem(data); // 任务项目数据

                this.taskDetailData = data;

                this.taskName = data.taskName; // 任务名称
                // 上级任务
                this.parentNameData = { "descriptionListTitle": "上级任务", des: data.parentName };
                // 任务描述
                this.memoData = { "descriptionListTitle": "任务描述", des: data.memo };
                // 任务项目
                this.projectData = { collapseOneTitle: '任务项目', data: pd };
                // 处理奖励机制数据
                this.rewardListData = { collapseOneTitle: '奖励机制', data: data.taskRewardList };
                this.punishListData = { collapseOneTitle: '惩罚规则', data: data.taskPunishList };

                this.dealDisplayData(data); // 处理表单展示区域数据
            }, res => {})
        },
        // 处理表单展示区域数据
        dealDisplayData(data) {

            var filter = this.$options.filters['dealFiveData'];
            var data1 = filter(data, true);
            var data2 = {
                "开始时间": data.startTime,
                "结束时间": data.endTime,
                "任务目标": data.targetDescription,
            };

            this.displayData = $.extend(data1, data2)
        },
        /**
         * [dealTaskItem 处理任务项目数据]
         * @author songxiaoyu 2019-05-24
         * @param  {[type]} data [返回数据]
         * @return {[type]}      [处理后数据]
         * 将taskProjectInfoList 和 taskProjectConditionVOList 合并成一个数组
         * 循环数据，使用展开收起组件
         */
        dealTaskItem(data) {
            var td = [],
                pInfo = {};

            if (data.taskProjectInfoList.length != 0) { // 拼接组件所需数据
                pInfo = {
                    'listTypeTwoTitle': '项目名称',
                    "listTypeTwokey": 'name',
                    data: data.taskProjectInfoList
                };
                td.push(pInfo)
            }
            td.push.apply(td, data.taskProjectConditionVOList)

            return td;
        },
        jumpToRank(){
            window.location.href = goUrl.taskRank + '?taskId=' + this.taskId;
        }
    }
}

</script>
