<!-- 
    列表8
     
    
 -->
<template>
    <div class="listTypeEight" v-if="listTypeEightData">
        <h4 v-if="listTypeEightData" class="lteH4">{{listTypeEightData.type}}</h4>
        <div class="lteDiv">{{listTypeEightData.value}}</div>
    </div>
</template>
<script>
export default {
    name: 'listTypeEight',
    props: ['listTypeEightData'],
    data() {
        return {}
    },
};

</script>
<style lang="less">
.listTypeEight {
    background-color: #fff;
    height: auto;
    padding: 0;

    .lteH4 {
        font-size: 0.6rem;
        line-height: 0.9rem;
        color: #333;
        padding: 0.2rem 0 0.2rem 0.4rem;
        position: relative;

        &:before {
            content: '';
            display: inline-block;
            width: .1rem;
            height: .5rem;
            background: rgb(255, 107, 0);
            position: absolute;
            top: 0.4rem;
            left: 0rem;
        }
    }

    .lteDiv {
        line-height: 0.9rem;
        font-size: 0.6rem;
        padding:0.2rem 0.4rem;
        color: #666;
    }
}

</style>
