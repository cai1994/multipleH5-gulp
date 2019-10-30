<!-- 
    倒计时
 -->
<template>
    <ul class="cdUl" :class="{red:lessTen}" v-if="cdData>1000">
        <li class="cdDay">
            <label :class="{cdSmall:ds>99}">{{ds}}</label>
            <span>天</span>
        </li>
        <li class="cdTime">
            <label>{{hs}}</label>
            <span>时</span>
        </li>
        <li class="cdMinute">
            <label>{{ms}}</label>
            <span>分</span>
        </li>
        <li class="cdSecond">
            <label>{{ss}}</label>
            <span>秒</span>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'countDown',
    props: ['cdData'], // 剩余时间，已结束，不显示倒计时
    data() {
        return {
            i: 0, // 过了多少秒
            d: '', //天
            h: '', // 小时
            m: '', // 分钟
            s: '', // 秒
            ds: '', //天+0
            hs: '', //时+0
            ms: '', //分+0
            ss: '', //秒+0
            lessTen: false, // 少于10天
        }
    },
    created() {
        this.countTime()
    },
    watch: {

    },
    computed: { // 时间大于1秒
    },
    methods: {
        countTime: function() {
            this.i++;

            var lt = this.cdData - (1000 * this.i);

            this.d = Math.floor(lt / 1000 / 60 / 60 / 24);
            this.h = Math.floor(lt / 1000 / 60 / 60 % 24);
            this.m = Math.floor(lt / 1000 / 60 % 60);
            this.s = Math.floor(lt / 1000 % 60);

            this.ds = this.d;
            this.hs = this.h;
            this.ms = this.m;
            this.ss = this.s;

            // 小于10加0
            if (this.d < 10) {
                this.lessTen = true;
                this.ds = '0' + this.d;
            }

            if (this.h < 10) {
                this.hs = '0' + this.h;
            }

            if (this.m < 10) {
                this.ms = '0' + this.m;
            }

            if (this.s < 10) {
                this.ss = '0' + this.s;
            }

            if (lt > 1000) {
                // 递归每秒调用countTime方法，显示动态时间效果
                setTimeout(this.countTime, 1000)
            }
        }
    }
};

</script>
<style lang="less">
.cdUl {
    li {

        float: left;
    }



}

</style>
