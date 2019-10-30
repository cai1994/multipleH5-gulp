<!-- 
    列表展示样式五
    listTypeFiveData:
 -->
<template>
    <div class="listTypeFive">
        <slot></slot>
        <div v-for="(value,key) in listTypeFiveData" class="ltfDiv" v-if="listTypeFiveData">
            <label>{{key}}</label>
            <span>{{value}}</span>
        </div>
    </div>
</template>
<script>
// 未开始

export default {
    name: 'listTypeFive',
    props: ['listTypeFiveData'],
    components: {
    },

    data() {
        return {
            
        }
    },
};

</script>
<style lang="less">
.listTypeFive {
    background-color: #fff;
    color: #666;
    font-size: 0.6rem;
    padding: 0 0.6rem;

    .ltfDiv {
        padding: 0.3rem 0;
    }
}

</style>
