<!-- 
    倒计时

    主要逻辑：
    1.剩余时间0，不显示
    2.少于10天，字变红，
    3.天>=100，天-字变小
 -->
<template>
    <div class="countDownRank" v-if="cdrData>1000">
        <div class="cdrText">距离活动结束还剩：</div>
        <!-- 小于10天，字变红 -->
        <count-down :cdData="cdrData" v-if="cdrData"></count-down>
        <img src="/task/static/img/left.png" class="cdPicl" />
        <img src="/task/static/img/right.png" class="cdPicr" />
    </div>
</template>


<script>

import countDown from "@src/common/countDown/countDown"

export default {
    name: 'countDownRank',
    props: ['cdrData'], // 剩余时间，已结束，不显示倒计时
    components: {
        countDown: countDown,
    },
    data() {
        return {
        }
    },
    created() {
    },
    computed: { // 时间大于1秒
    },
    watch: {
    },
    methods: {
        
    }
};

</script>
<style lang="less">
.countDownRank {
    position: relative;
    height: 4rem;
    background-color: #ff771c;
    padding: 0.5rem 1.8rem 0.8rem;
    box-shadow: 0rem 0.1rem 0.3rem 0rem rgba(255, 173, 123, 0.66);
    margin-bottom: 2rem;


    .cdrText {
        color: #fff;
        font-size: 0.9rem;
        margin-bottom: 0.6rem;
    }

    .cdPicl{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 4.8rem;
    }

    .cdPicr{
        position: absolute;
        bottom: 0;
        right: 0;
        width:4.8rem;
    }


    .cdUl {
        position: absolute;

        li {
            float: left;
            margin-right: 0.5rem;
            text-align: center;
            width: 3.4rem;
            height: 3.2rem;
            background: #fff;
            border-radius: 0.2rem;
            box-shadow: 0rem 0.1rem 0.3rem 0rem rgba(255, 173, 123, 0.66);


            &:last-child {
                margin-right: none;
            }

            label {
                display: inline-block;
                font-size: 1.6rem;
                color: #666;
                margin-top: 0.6rem;

                &.cdSmall{
                    font-size:1.3rem;
                    margin-top: 0.9rem;
                }
            }

            span {
                display: inline-block;
                font-size: 0.6rem;
                color: #666;
                margin-top: 1.3rem;

            }

        }

        &.red li label { // 少于10天标红
            color: #ff6600;
        }
    }





}

</style>
