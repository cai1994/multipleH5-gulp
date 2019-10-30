<!-- 
    调用示例
     <list-TypeThree :listTypeThreeData="slotProps.collapseObj | dealRewardData"></list-TypeThree>
     dealRewardData: function(data) {
        return {
            listTypeThreeTitle: data.name,
            '奖励时间：': data.startTime + '至' + data.endTime,
            '奖励对象：': data.object,
            '奖励内容：': data.content,
        };
    },
    
 -->
<template>
    <div class="listTypeThree" v-if="listTypeThreeData">
        <h4 v-if="listTypeThreeData.listTypeThreeTitle" class="lttH4">{{listTypeThreeData.listTypeThreeTitle}}</h4>
        <ul class="lttUl">
            <li v-for="(value,key,index) in listTypeThreeData" v-if="index>0" class="lttLi">
                <label class="lttLabel">{{key}}</label>
                <div class="lttDiv">{{value}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'listTypeThree',
    props: ['listTypeThreeData'],
    data() {
        return {}
    },
};

</script>
<style lang="less">
.listTypeThree {
    background-color: #fff;
    height: auto;
    padding: 0;

    .lttH4 {
        font-size: 0.6rem;
        color: #333;
        padding: 0.6rem 0.4rem 0.3rem 0.4rem;
        position:relative;

        &:before {
            content: '';
            display: inline-block;
            width: .1rem;
            height: .5rem;
            background: rgb(255, 107, 0);
            position: absolute;
            top: 0.8rem;
            left: 0rem;
        }
    }

    .lttUl {
        font-size: 0.6rem;
        color: #666;
        padding:0 0.6rem;

        .lttLi {
            display: table;
            padding: 0.25rem 0;

            .lttLabel {
                display: table-cell;
                vertical-align: top;
                width: 3.2rem;
            }

            .lttDiv {
                display: table-cell;
                line-height: 0.9rem;
            }
        }
    }
}

</style>
