<!-- 
    解释性列表
    { "descriptionListTitle": "任务描述",  // 列表标题
      "des": data.memo    // 描述
    }
 -->
<template>
    <div class="descriptionList" v-if="descriptionListData">
        <h3 class="dlH3">{{descriptionListData.descriptionListTitle}}</h3>
        <div class="dlDiv" >{{descriptionListData.des}}</div>
    </div>
</template>
<script>
export default {
    name: 'descriptionList',
    props: ['descriptionListData'], 
    data() { 
        return {}
    },
};

</script>
<style lang="less">
.descriptionList {
    background-color: #fff;
    height: auto;
    margin-bottom:0.5rem;

    .dlH3{
        font-size: 0.7rem;
        color:#333;
        padding:0.6rem;
        border-bottom:1px solid #e9e9e9;
    }

    .dlDiv{
        padding:0.6rem;
        font-size: 0.6rem;
        color:#666;
        line-height: 0.9rem;
    }

}

</style>
