<template>
  <div class="detailItem" v-if="datas!=[]">
    <p>
      {{datas.projectName}}
      <span class="r">私募类型</span>
    </p>
    <p>{{datas.empName}} <span></span></p>
    <p>预约时间:<span></span> {{datas.reserveTime}}</p>
    <p>预约金额: <span></span>{{datas.reserveAmt}}</p>
    <p>到账时间:<span></span>{{datas.transTime}}</p>
    <p>到账金额:<span></span>{{datas.empName}}</p>
    <p>
      <span>业绩系数:{{datas.achieveRate}}</span>
      <span style="marginLeft:1rem;">业绩: ￥{{datas.performAmt}}元</span>
    </p>
  </div>
</template>
<script>
export default {
  props:["datas"]
};
</script>
<style lang="less" scoped>
.detailItem {
  color: #333333;
  border-bottom: #3c3c3c 0.05rem solid;
  padding: 0.4rem 5vw 0;
  padding-top: 0.4rem;
  padding-bottom: 0.3rem;
  p {
    font-size: 0.7rem;
    word-break: break-all;
    text-align: justify;
    color: #333333;
    .r {
      float: right;
      background-color: darkorange;
    }
  }
}
</style>
