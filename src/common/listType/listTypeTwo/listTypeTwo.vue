<!-- 
    列表样式2

    <list-typeTwo :listTypeTwoData="projectData"></list-typeTwo>
    { "listTypeTwoTitle": "任务项目", "listTypeTwokey": 'name', data: data }

    {
        "listTypeTypeTitle":"任务项目", // 列表标题
        "listTypeTwokey":'name', // 取值key
        data:[{ // 循环数据 data是个数组 
             "id": 10051,
             "code": "MP1521689238991365",
             "name": "测试01"
        },
        {
             "id": 10151,
             "code": "MP1521708288083711",
             "name": "测试2"
        }], 
    }
 -->
<template>
    <div class="listTypeTwo" v-if="listTypeTwoData.data">
        <h3 class="lttH3">{{listTypeTwoData.listTypeTwoTitle}}</h3>
        <ul class="lttUl">
            <li v-for="l in listTypeTwoData.data" v-if="listTypeTwoData.data" class="lttLi">
                {{l[key]}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'listTypeTwo',
    props: ['listTypeTwoData'],
    data() {
        return {}
    },
    computed: {
        key() {
            return this.listTypeTwoData.listTypeTwokey;
        }
    },
};

</script>
<style lang="less">
.listTypeTwo {
    background-color: #fff;
    height: auto;
    margin-bottom: 0.5rem;

    .lttH3 {
        font-size: 0.7rem;
        color: #333;
        padding: 0.6rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .lttUl {
        padding:0.2rem 0.6rem 0.4rem 0.6rem;

        .lttLi {
            line-height: 0.9rem;
            font-size: 0.6rem;
            padding-top:0.2rem;
            padding-bottom:0.2rem;
            color: #666;
        }
    }


}

</style>
