<template>
    <div>
        <list-toinfo :listData="listData" @toInfo="toInfo"></list-toinfo>
        <no-data :showNoData="showNoData" :show="show"></no-data>
    </div>
</template>
<script>
import './taskChildList.less'
import './taskChildList.js'
import listToinfo from "@src/common/listToinfo/listToinfo"
import noData from '@src/common/noData/noData'
export default {
    name: "taskFile",
    components: {
        listToinfo: listToinfo,
        noData: noData,
    },
    data() {
        return {
            listData: [],
            showNoData: false,
            taskId:splitUrl()['taskId'],
            show: 'show', //展示暂无数据
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList: function() {
            this.$axiosHttp.http({
                name: '子任务接口',
                url: apiUrl.querySubTaskListByTaskIdApi,
                needFailCallback: true,
                params: {
                    taskId: this.taskId
                }
            }, (res) => {
                this.listData = res.data.data;

            }, res => {
                this.showNoData = true; //显示暂无数据
            })
        },
        //跳转详情
        toInfo(id) {
            window.location.href = goUrl.taskDetail + '?taskId=' + id;
        }
    }
}

</script>
