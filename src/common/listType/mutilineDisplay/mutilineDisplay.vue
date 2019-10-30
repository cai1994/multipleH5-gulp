<!-- 
    多行展示列表
    mutilineData是个对象
    {
        mutlineDisplayTitle: '惩罚规则', // 标题，必须放到第一个，列表展示从第二个开始,没有标题可以传‘’
        '惩罚名称：': data.name,
        '惩罚标准：': data.standard,
        '惩罚内容：': data.content,
  
    }
 -->
<template>
    <div class="multilineDisplay" v-if="mutilineData">
        <h3 v-if="mutilineData.mutlineDisplayTitle" class="mldH3">{{mutilineData.mutlineDisplayTitle}}</h3>
        <ul class="mldUl">
            <li v-for="(value,key,index) in mutilineData" v-if="index>0" class="mldLi">
                <label class="mldLabel">{{key}}</label>
                <div class="mldDiv">{{value}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'multilineDisplay',
    props: ['mutilineData'],
    data() {
        return {}
    },
};

</script>
<style lang="less">
.multilineDisplay {
    background-color: #fff;
    height: auto;
    margin-bottom: 0.8rem;
    padding: 0;

    .mldH3 {
        font-size: 0.7rem;
        color: #333;
        padding: 0.6rem;
        border-bottom: 1px solid #e9e9e9;
    }

    .mldUl {
        padding: 0.6rem;
        font-size: 0.6rem;
        color: #666;

        .mldLi {
            display: table;
            padding: 0.25rem 0;

            .mldLabel {
                display: table-cell;
                vertical-align: top;
                width: 3.8rem;
                text-align: right;
            }

            .mldDiv {
                display: table-cell;
                line-height: 0.9rem;
            }
        }
    }
}

</style>
