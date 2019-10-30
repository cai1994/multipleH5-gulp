<!-- 
   列表展示样式六
   左边列表，右边图标
 -->
<template>
    <div class="listTypeSix">
        <div class="ltsLeft">
            <slot></slot>
        </div>
        <div class="ltsRight">
            <template>
                <svg class="ltsSvg" aria-hidden="true" v-if="rankNum==1">
                    <use xlink:href="#icon-ziyuan29"></use>
                </svg>
                <svg class="ltsSvg" aria-hidden="true" v-else-if="rankNum==2">
                    <use xlink:href="#icon-ziyuan27"></use>
                </svg>
                <svg class="ltsSvg" aria-hidden="true" v-else-if="rankNum==3">
                    <use xlink:href="#icon-ziyuan19"></use>
                </svg>
                <svg class="ltsSvg" aria-hidden="true" v-else>
                    <use xlink:href="#icon-ziyuan21"></use>
                </svg>
            </template>
            <i class="ltsRank">第{{$utils.integerToChinese(rankNum)}}名</i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'listTypeSix',
    props: ['rankNum'],
    components: {},
    data() {
        return {
            index: 1, // 排名
            bigIcon: false, // 右侧大icon
        }
    },
};

</script>
<style lang="less">
.listTypeSix {
    background-color: #fff;
    color: #999;
    font-size: 0.6rem;
    padding-bottom: 0.5rem;

    .ltsLeft {
        display: inline-block;
        width: 70%;

        .ltsDiv {
            padding: 0.3rem 0;
        }
    }

    .ltsRight {
        display: inline-block;
        width: 28%;
        text-align: center;

        .ltsSvg {
            display: inline-block;
            width: 4rem;
            height: 3.7rem;
        }

        .ltsRank {
            display: inline-block;
            color: #333;
            font-size: 0.7rem;
            margin-top: 0.1rem;
            padding-left: 0.2rem;
        }
    }
}

</style>
