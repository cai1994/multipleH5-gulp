<!-- 
    页面title模板
    title: 标题名称
    rankNum:右侧排名图标和文字显示，不传，不显示右侧图标
 -->
<template>
    <div class="pageTitle">
        <div class="">
            <h2 :class="[{'pt87':rankNum},'pth2']">{{title}}</h2>
            <span v-if="rankNum" class="ptIcon">
                <!-- 右侧图标 -->
                <template >
                    <svg class="ptSvg" aria-hidden="true" v-if="rankNum==1">
                        <use xlink:href="#icon-ziyuan28"></use>
                    </svg>
                    <svg class="ptSvg" aria-hidden="true" v-else-if="rankNum==2">
                        <use xlink:href="#icon-ziyuan26"></use>
                    </svg>
                    <svg class="ptSvg" aria-hidden="true" v-else-if="rankNum==3">
                        <use xlink:href="#icon-ziyuan25"></use>
                    </svg> 
                    <svg class="ptSvg" aria-hidden="true" v-else>
                        <use xlink:href="#icon-ziyuan24"></use>
                    </svg>
                </template>
                <i class="ptrank" v-if="rankNum">第{{rankNum}}名</i>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pageTitle',
    props: ['title','rankNum'],
    data() {
        return {

        }
    },
};

</script>
<style lang="less">
.pageTitle {
    position: relative;
    background-color: #fff;
    height: auto;
    line-height: 1.1rem;
    padding: 0.8rem 0.6rem;
    position: relative;
    color: rgb(51, 51, 51);
    font-size: .8rem;
    word-break: break-all;


    &:before {
        content: '';
        display: inline-block;
        width: .2rem;
        height: .65rem;
        background: rgb(255, 107, 0);
        position: absolute;
        top: 1rem;
        left: 0rem;
    }

    .pth2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .pt87 {
        width: 86%;
    }

    .ptIcon {
        position: absolute;
        width: 13%;
        top: 0.3rem;
        right: 0.6rem;
        text-align: center;

        .ptrank {
            display: inline-block;
            font-size: 0.5rem;
            color: #666;

        }

        .ptSvg {
            width: 1.1rem;
            height: 1rem;

        }

    }

}

</style>
