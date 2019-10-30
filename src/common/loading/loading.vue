<template>
     <div class="v_center box" style="position:fixed;top:0;right:0;left:0;bottom:0;background:#fff;z-index:999;padding-top:1rem;" id="loading" v-if="showLoading">
      <div class="load" style="text-align:center;">
        <span class="iconfont loadingIcon" style="font-size:1.5rem;color:#f4cf5c;display:inline-block;">&#xe602;</span>
        <span style="display:block;line-height:2rem;font-size:0.75rem;color:#7d7c7d;height:2rem;vertical-align:top;margin-top:0.75rem;">加载中...</span>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        showLoading:Boolean
    },
    data(){
        return {
               
        }
    },
    created(){
    },
    watch:{
    }
}
</script>

