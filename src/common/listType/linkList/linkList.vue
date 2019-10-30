<!-- 
    跳转列表
 -->
<template>
    <ul class="linkList">
        <li v-for="(value,key) in linkList" @click="linkFunc(value)">{{key}}</li>
    </ul>
</template>
<script>
export default {
    name: 'linkList',
    props: ['linkList'],
    data() {
        return {}
    },
    methods: {
        linkFunc: function(goUrl) {
            window.location.href = goUrl;
        }
    }
};

</script>
<style lang="less">
.linkList {
    background-color: #fff;

    li {
        padding: 0 0.7rem;
        line-height: 2.5rem;
        font-size: 0.7rem;
        color: #687785;
        border-bottom: 1px solid #e9e9e9;

        &:last-child{
            border-bottom: none;
        }

        &:after {
            font-family: iconfont;
            font-style: normal;
            text-decoration: none;
            -webkit-font-smoothing: antialiased;
            content: '\e606';
            float: right;
            color: #ccc;
        }
    }

}

</style>
