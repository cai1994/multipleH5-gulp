<!-- 
    我的任务列表页
 -->
<template>
    <section class="page">
        <div class="listWrap">
        </div>
        <template>
            <ul class="" id="tableList" v-show="false">
                <li class="dataList" v-for="(data,index) in listData" :key="index" :taskId="data.taskId" >
                    <!-- 标题 -->
                    <page-title :title="data.taskName"></page-title>
                    <!-- 未开始 -->
                    <template v-if="tabIndex==0">
                        <time-display :tdData="data"></time-display>
                    </template>
                    <!-- 进行中 -->
                    <template v-if="tabIndex==1">
                        <time-display :tdData="data"></time-display>
                        <list-typeFive :listTypeFiveData="data | dealFiveData"></list-typeFive>
                        <progress-component :progressComponentData="data | pcData"></progress-component>
                    </template>
                    <!-- 已结束 -->
                    <template v-if="tabIndex==2">
                        <list-typeSix :rankNum="data.rankNum">
                            <time-display :tdData="data"></time-display>
                            <list-typeFive :listTypeFiveData="data | dealFiveData"></list-typeFive>
                        </list-typeSix>
                    </template>
                </li>
            </ul>
        </template>
        <loading :showLoading="showLoading"></loading>
    </section>
</template>
<script>
import "./taskList.less";

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
// 时间展示
import timeDisplay from "@src/task/common/list/timeDisplay"

import listOperate from "@src/task/common/mixins/listOperate.js"

export default {
    name: "taskList",
    mixins: [pullUpDown, listOperate],
    components: {
        progressComponent: progressComponent,
        listTypeFive: listTypeFive,
        listTypeSix: listTypeSix,
        timeDisplay: timeDisplay,
        pageTitle: pageTitle,
    },
    data() {
        return {
            showNoData: false,
            tabList: [
                { name: '未开始', code: 1 },
                { name: '进行中', code: 2 },
                { name: '已结束', code: 3 },
            ], //导航
            tabIndex: 0,
        };
    },
    computed: {
        httpConfig: function() { // 列表请求可变参数
            var val = this.tabIndex;
            var a = {
                key: 'type',
                val: this.tabList[val].code
            };
            return [a];
        }
    },
    created() {
        //配置接口参数
        this.httpUrl = apiUrl.queryMyTaskListApi;

    },
    mounted() {
        // 默认滑动到第2个tab
        mui('#slider').slider().gotoItem(1);
    },
    methods: {}
};

</script>
