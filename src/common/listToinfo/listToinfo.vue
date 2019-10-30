<template>
  <div>
    <ul class="list">
      <li class="clearfix" v-for="item in listData" :key="item.taskId" @click="toInfo(item.taskId)">
        <p>{{item.taskName}}</p>
        <span class="iconfont icon-guanbi">&#xe606;</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:['listData'],
  methods: {
    toInfo(id){
      this.$emit('toInfo',id);
    }
  }
}
</script>
<style>
.list li{
  background-color: #fff;
  padding: .75rem;
  margin-top: .5rem;
  font-size: .7rem;
}
.list li p{
  color: #333;
  float: left;
}
.list span{
  font-size: .7rem;
  color: #ccc;
  float: right;
  margin-top: .15rem;
}
</style>


