<!-- 
   任务排名页面,
   listData在pullupdown中定义
 -->
<template>
    <section class="taskRank page" v-if="httpReturnData">
        <count-downRank :cdrData="httpReturnData.residueTime" v-if="httpReturnData.residueTime"></count-downRank>
        <!-- <count-down :cdData="httpReturnData.residueTime" ></count-down> -->
        <div class="listWrap">
        </div>
        <template>
            <ul id="tableList" v-show="false">
                <li class="dataList" :class="{current:data.rowNum==httpReturnData.rowNum}" v-for="(data,index) in rankData" :key="index" v-if="rankData">
                    <list-typeFour>
                        <template>
                            <svg slot="left" aria-hidden="true" v-if="data.rowNum==1">
                                <use xlink:href="#icon-ziyuan28"></use>
                            </svg>
                            <svg slot="left" aria-hidden="true" v-else-if="data.rowNum==2">
                                <use xlink:href="#icon-ziyuan26"></use>
                            </svg>
                            <svg slot="left" aria-hidden="true" v-else-if="data.rowNum==3">
                                <use xlink:href="#icon-ziyuan25"></use>
                            </svg>
                            <template slot="left" v-else>{{data.rowNum}}</template>
                        </template>
                        <template slot="center">
                            <h4 class="ltfH4">{{data.name}}</h4>
                            <template>
                                <span class="ltfSpan" v-if="data.rowNum==1">太棒了，已经是第一名了！</span>
                                <span class="ltfSpan" v-else>距离上一名还差<i>{{data.lastDifference}}</i></span>
                            </template>
                        </template>
                        <template slot="right">{{data.currentCompleted}}</template>
                    </list-typeFour>
                </li>
            </ul>
        </template>
        <loading :showLoading="showLoading"></loading>
    </section>
</template>
<script>
import "./taskRank.less";

import tipAction from "@common/components/otherComponents/tipAction/tipAction"
// tab切换上拉加载，下拉刷新
import pullUpDown from "@src/common/pullUpDown/pullUpDown.js"
// 进度条
import progressBar from "@src/common/progressBar/progressBar"
// 左中右3列布局
import listTypeFour from "@src/common/listType/listTypeFour/listTypeFour"

import countDown from "@src/common/countDown/countDown"

// 倒计时
import countDownRank from "@src/task/common/countDownRank"



export default {
    name: "taskRank",
    mixins: [pullUpDown],
    components: {
        progressBar: progressBar,
        listTypeFour: listTypeFour,
        countDownRank: countDownRank,
        countDown: countDown,
    },
    data() {
        return {
            showNoData: false,
            tabList: [], //导航
            tabIndex: 0,
            taskId: splitUrl()['taskId'],
            httpReturnParam: 'taskRankAppVOList', // 接口返回配置取值，
            httpReturnData: {}, // 接口返回是对象，对象里面有数组时使用，复用代码
            needNavAction: true, // 可滑动导航配置
            dynamicTab: true, // 动态加载tabList
            isConcat:true,//用于判断是否需要自己拼接数据
        };
    },
    computed: {
        httpConfig: function() { // 列表请求可变参数
            var val = this.tabIndex;
            var a = [{
                key: 'taskId',
                val: this.taskId
            }, {
                key: 'rankingType',
                val: this.tabList[val].code
            }];
            return a;
        },
        rankData: function() { // 处理排行数据，将当前的排名(对象)放在任务排名列表的第一个；
            var arr = [];
            var c = [];
            if (this.isConcat) {
                var a = JSON.parse(JSON.stringify(this.httpReturnData));
                delete a.taskRankAppVOList;
                arr.push(a);
            }
            
            c = arr.concat(this.listData);

            return c;
        }
    },
    watch: {

    },
    created() {
        // 获取排名标签
        this.getTagList();

        // 查看任务详情
        $('body').on('tap', '.dataList', (event) => {
            // 待定要不要 todo
            // this.goToDetail();
        })
    },
    mounted() {},
    methods: {
        // 查看任务详情
        goToDetail(id) {
            window.location.href = goUrl.taskDetail;
        },
        getTagList() {
            this.$axiosHttp.http({
                name: '排名标签列表',
                url: apiUrl.queryTaskRankTagListApi,
                needFailCallback: true,
                params: {
                    taskId: this.taskId
                }
            }, (res) => {
                this.tabList = res.data.data;

                //配置下属任务列表接口参数
                this.httpUrl = apiUrl.queryTaskRankListApi;

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
