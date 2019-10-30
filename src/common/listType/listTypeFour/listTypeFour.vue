<!-- 
    第4种listtype，左中右3列布局,样式组件
 -->
<template>
    <div class="listTypeFour">
        <div class="ltfLeft">
            <slot name="left"></slot>
        </div>
        <div class="ltfCenter">
            <slot name="center"></slot>
        </div>
        <div class="ltfRight">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'listTypeFour',
    props: [''],
    data() {
        return {}
    },
};

</script>
<style lang="less">
.listTypeFour {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 1rem 0.6rem;
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;
    font-size: 0.8rem;
    color: #666;

    .ltfLeft {
        width: 1.5rem;
        text-align: center;
        margin-right: 0.2rem;
        font-size: 0.8rem;
        font-style: italic;

        svg {
            width: 1.5rem;
            height: 1.2rem;
            display: inherit;
        }

    }

    .ltfCenter {
        width: 58%;

        .ltfH4{
            color:#333;
        }



        .ltfSpan {
            font-size: 0.6rem;

            i{
                margin-left: 0.2rem;
            }
        }
    }

    .ltfRight {
        text-align: right;
        width: 55%;
        color: #ff6600;
    }
}

</style>
