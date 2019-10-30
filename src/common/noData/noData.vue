
<!-- 
    暂无数据图标 

    noPage 传 'noPage'的时候，会自动添加class noPage
    此时图标的absolute定位会变为relative

    show 传 'show'的时候，会自动添加class show
    此时图标会变为display:block，与showNoData可以切换无分页时的暂无数据的显示隐藏
-->
<template>
    <div class="noDataInfo" v-if="showNoData" :class="[noPage,show]">
      <div class="noDataInner">
        <img src="/common/noData/img/noData.png" />
        <p>暂无数据</p>
      </div>
    </div>
</template>
<script>

//noData的样式写在resetMui.less里，这里不用引入了
//import './noData.less';
export default {
    props:{
        showNoData:Boolean,
        noPage: String,
        show: String
    },
    data(){
        return {
               
        }
    },
    created(){
        this.showNoData = false;
    },
    watch:{
        // 'showNoData':function(newVal,oldVal){

        //     this.showNoData = oldVal;

        // }
    }
}
</script>

