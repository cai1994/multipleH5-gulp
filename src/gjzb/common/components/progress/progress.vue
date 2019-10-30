<template>
  <div class="progressCon">
    <label>发行进度</label>
    <div class="progressBox">
      <div class="mui-progressbar">
        <span></span>
        
      </div>
      <span class="start">0</span>
      <span class="end">{{obj.total}}万</span>
      <!-- left值计算：0.8是进度条的宽度，3是进度条的left值 -->
      <div class="hintWord" :style="{left:Number(this.obj.currentNum/this.obj.total)*0.8*100+3+'%'}" :currentNum="this.obj.currentNum" :total="this.obj.total">
          <label v-if="obj.currentNum">{{obj.currentNum}}万</label>
          <i v-if="obj.currentNum"></i>
        </div>
    </div>
    
  </div>  
</template>
<style lang="less">
@import './progress.less';
</style>
<script>
export default {
  props:{
    obj:{
      type:Object,
      default:{
        total:"",//总值
        currentNum:"",//当前值
        index:1,
      }
    }
  },
  data(){
    return{

    }
  },
  // mounted:function(){
  //   this.setPro();
    
  // },
  // methods:{
  //   setPro(){
  //     console.log(this.obj)
  //     //mui(".mui-progressbar").progressbar({ progress: Number(this.obj.currentNum/this.obj.total)*100 }).show();
  //   }
  // }

}
</script>


