<!-- 
    任务列表未开始样式

    nbData: 未开始所用字段
 -->
<template>
    <div class="timeDisplay" v-if="tdData">
        <!-- 未开始 -->
        <template v-if="tdData.type==1">
            <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-ziyuan16"></use>
            </svg>
            <span>{{tdData.startTime}} 至 {{tdData.endTime}}</span>
        </template>
        <!-- 进行中 -->
        <template v-if="tdData.type==2">
            <!-- 大于10天 -->
            <template v-if="tdData.residueTime>86400000">
                <svg class="iconsvg" aria-hidden="true">
                    <use xlink:href="#icon-ziyuan17"></use>
                </svg>
                <span>{{tdData.startTime}} 至 {{tdData.endTime}}</span>
            </template>
            <!-- 小于10天 -->
            <template v-else>
                <svg class="iconsvg" aria-hidden="true">
                    <use xlink:href="#icon-ziyuan18"></use>
                </svg>
                <span>离结束日<i class="tdI">{{tdData.endTime}}</i>还剩 <i class="tdI2">{{tdData.residueTimeStr}}</i></span>
            </template>
        </template>
        <!-- 已结束 -->
        <template v-if="tdData.type==3">
            <svg class="iconsvg" aria-hidden="true">
                <use xlink:href="#icon-ziyuan23"></use>
            </svg>
            <span>活动已于{{tdData.endTime}}结束</span>
        </template>
    </div>
</template>
<script>
export default {
    name: 'timeDisplay',
    props: ['tdData'],
    data() {
        return {

        }
    },
};

</script>
<style lang="less">
.timeDisplay {
    background-color: #fff;
    color: #666;
    font-size: 0.6rem;
    padding: 0.6rem;

    svg {
        width: 1rem;
        height: 1rem;
        margin-right: 0.4rem;
    }

    .tdI {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    .tdI2 {
        margin-left: 0.1rem;
        color: #ff3600;
    }
}

</style>
