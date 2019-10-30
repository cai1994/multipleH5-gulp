<template>
    <div>
        <!-- 附件列表 -->
        <file-list :fileData="dataList" @downFile="downFile"></file-list>
        <!-- 附件列表 -->
        <!-- 暂无数据 -->
        <no-data :showNoData="showNoData" :show="show"></no-data>
        <!-- 暂无数据 -->
    </div>
</template>
<script>
import fileList from "@src/common/fileList/fileList"
import noData from '@src/common/noData/noData'
export default {
    name: "taskFile",
    components: {
        fileList: fileList,
        noData: noData,
    },
    data() {
        return {
            dataList: [],
            showNoData: false,
            show: 'show', //展示暂无数据
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList: function() {
            this.$axiosHttp.http({
                name: '附件列表接口',
                url: apiUrl.queryFileListByTaskIdApi,
                needFailCallback: true,
                params: {
                    taskId: splitUrl()['taskId']
                }
            }, (res) => {
                this.dataList = res.data.data;

            }, res => {
                this.showNoData = true; //显示暂无数据
            })
        },
        downFile: function(id, fileName) {
            window.location.href = goUrl.fileTemplate + '?fileId=' + id + '&fileName=' + encodeURI(fileName);
        }
    }
}

</script>
