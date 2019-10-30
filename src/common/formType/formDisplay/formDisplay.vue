<!-- 
    纯展示表单区域
 -->
<template>
    <div class="formDisplay">
        <ul>
            <li v-for="(value,key) in formDisplayData">
                <label>{{key}}</label>
                <span>{{value}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'formDisplay',
    props: ['formDisplayData'],
    data() {
        return {}
    },
};

</script>
<style lang="less">
.formDisplay {
    background-color: #fff;
    height: auto;
    border-radius: 0.2rem;
    border:solid 0rem #f3f3f3;

    ul{
        li{
            line-height: 1.9rem;
            border-bottom: 1px solid #e9e9e9;
            font-size:0.7rem;
            padding: 1px .8rem;

            label{
                color:#999;
            }

            span{
                float: right;
                color: #333;

            }

            &:last-child{
                border-bottom:none;
            }

        }
    }

    
}

</style>
