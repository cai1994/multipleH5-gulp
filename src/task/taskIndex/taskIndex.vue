<!-- 入口
    任务目标页面
    点击进入相应任务列表
    @author songxiaoyu 2019-05-06
-->
<template>
    <div class="indexList">
        <list :list="list"></list>
    </div>
</template>
<script>
//引入list组件
import list from '@src/common/list/list'

export default {
    name: "taskIndex",
    components: {
        list
    },
    data() {
        return {
            list: [{
                    img: '/task/static/img/myTask.png',
                    name: '我的任务',
                    clickFunc: function() {
                        // 跳转我的任务列表
                        window.location.href = goUrl.taskList;
                    }
                },
                {
                    img: '/task/static/img/subordinateTask.png',
                    name: '我的下属任务',
                    clickFunc: function() {
                        // 跳转下属任务列表
                        window.location.href = goUrl.subordinateList;
                    }
                }
            ]
        };
    }
}

</script>
