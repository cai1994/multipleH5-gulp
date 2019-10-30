<template>
  <div class="evaluate">
    <div class="seeMoreLine"></div>
    <div class="time">{{submitTime}}确认</div>
    <div class="evaluateInfo">
      <h1>确认反馈</h1>
      <ul class="scoreList">
        <li class="clearfix" v-for="item in activityGrades" :key="item.no">
            <div class="scoreL">{{item.name}}</div>
            <div class="scoreR">
              <span class="iconfont icon-xingji" v-for="n in 5" :key="n"    :class="{'light':item.value >= n}">&#xe601;</span>
            </div>
        </li>
      </ul>
    </div>
    <div class="evaluateInfo">
      <h1>{{backTitle}}</h1>
      <p>{{backInfo}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    activityGrades:{
      type:Array,
      default:[]
    },
    backTitle:{
      type:String,
      default:"评价与建议"
    },
    backInfo:{
      type:String,
      default:""
    },
    submitTime:{
      type:String,
      default:""
    }
  },
  data(){
    return{
      
    }
  }
}
</script>


<style lang="less">
@import './evaluateInfo.less';
</style>

