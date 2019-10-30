<!-- 
    展开收起
    结合单条list类型组件的使用，使用slot，将数据传回父组件，供组件里的slot里的组件渲染值

    {
        collapseOneTitle: '奖励机制',
        data: [{  // 循环列表的数据，里面的字段可以在父组件里通过filter重置
            name: 1,
            object: 2,
            content:4,
            startTime:1,
            endTime: 2,
        }, {
            name: 1,
            object: 2,
            content:4,
            startTime:1,
            endTime: 2,
        }],
    }

 -->
<template>
    <div class="collapseOne" v-if="collapseOneData.data" slot-scope="props" :class="[collapseOneClass]">
        <h3 class="coH3">
            {{collapseOneData.collapseOneTitle}}
            <template v-if="collapseOneData.data.length>1">
                <span v-if="status" @click="hideFunc">收起</span>
                <span v-else @click="openFunc">展开</span>
            </template>
        </h3>
        <ul class="coUl">
            <li v-for="(obj,index) in collapseOneData.data" :class="['coLi',{show:index<showIndex}]" v-show="index<showIndex">
                <slot v-bind:collapseObj="obj"></slot>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'collapseOne',
    props: ['collapseOneData', 'collapseOneClass'],
    data() {
        return {
            status: false, // 展开收起状态 ,如果有需要，可修改为传入status;
            defaultIndex: 1, // 默认展示1条, 如果有需要，可修改为传入defaultIndex
            showIndex: 0, // 展示几条
        }
    },
    created() {
        this.showIndex = this.defaultIndex; // 如果有需要，可修改为传入defaultIndex
    },
    methods: {
        hideFunc() {
            this.status = !this.status;
            this.showIndex = this.defaultIndex;
        },
        openFunc() {
            this.status = !this.status;
            this.showIndex = Infinity;
        },
    }
};

</script>
<style lang="less">
.collapseOne {
    background-color: #fff;
    height: auto;
    margin-bottom: 0.5rem;

    .coH3 {
        font-size: 0.7rem;
        color: #333;
        padding: 0.6rem;
        border-bottom: 1px solid #e9e9e9;

        span {
            float: right;
            color: #ff6600;
            font-size: 0.7rem;
        }
    }

    .coUl {
        padding: 0 0.6rem;

        .coLi {
            line-height: 0.9rem;
            font-size: 0.6rem;
            padding-top: 0.2rem;
            padding-bottom: 0.6rem;
            color: #666;
            border-bottom: 1px solid #e9e9e9;

        }

        .coLi.show {
            &:last-child {
                border-bottom: none;
            }
        }
    }


}

</style>
