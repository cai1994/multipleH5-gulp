<!-- 
    进度条组件

    {
        left: '完成进度',
        percent:d.completed,
        right:'出单率'
    }
 -->
<template>
    <div class="progressComponent" v-if="progressComponentData">
        <span class="pcSpan1">{{progressComponentData.left}}</span>
        <div class="pcBar">
            <progress-bar :percentage="progressComponentData.percent"></progress-bar>
        </div>
        <p class="pcSpan2">{{progressComponentData.right}}</p>
    </div>
</template>

<script>
import progressBar from "@src/common/progressBar/progressBar"

export default {
    name: 'progressComponent',
    props: ['progressComponentData'],
    components: {
        progressBar: progressBar,
    },
    data() {
        return {

        }
    },
};

</script>
<style lang="less">
.progressComponent {
    background-color: #fff;
    color: #666;
    font-size: 0.6rem;
    padding: 0.5rem;

    .pcSpan1{
        font-size: 0.6rem;
    }

    .pcBar{
        display: inline-block;
        width: 82%;

    }

    .pcSpan2{
        color: #ff8933;
        text-align: right;
        margin-top:0.2rem;
    }



}

</style>
