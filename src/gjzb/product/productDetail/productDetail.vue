<template>
  <div class="detail">
      <div class="tit"><span>{{insurePlan.projectName}}</span></div>
      <div class="tabListBox">
        <vue-tab :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
          <keep-alive>
            <component :is="currentContent" :insurePlan="insurePlan">

            </component>

          </keep-alive>
        </vue-tab>
      </div>
  </div>
  

</template>

<script>
import './productDetail.js'
import vueTab from '@common/components/vueComponents/tab/tab.vue'

import One from './one.vue'

import Two from './two.vue'
export default {
  components: {
    vueTab,
    'one':One,
    'two':Two,
  },
  data(){
    return{
      tabIndex: 0,
      currentContent: "one",
      tabList: [
        {
          index: 0,
          name: '基本资料',
          component: 'one'
        },
        {
          index: 1,
          name: '发行方案',
          component: 'two'
        }
      ],
      insurePlan:{},
    }
  },
  created(){
    this.getProductDetail();
    
  },
  methods:{
    changeTab: function (tab) {
      this.tabIndex = tab.index;
      this.currentContent = tab.component
    },
    getProductDetail(){
         this.$axiosHttp.http({
          url: apiUrl.productDetail,
          params:{
            projectId:splitUrl()['projectId']
          }
        }, (res) => {
          this.insurePlan=res.data.data;
          if(this.insurePlan.callProportion){
           this.insurePlan.callProportion = this.insurePlan.callProportion.split(',');
          }
          if(this.insurePlan.callTime){
            this.insurePlan.callTime = this.insurePlan.callTime.split(',');
          }
        }, res => {
            
        })
    },
    //获取浏览器上面的id
   
  }
}
</script>

<style lang="less">
@import './productDetail.less';
</style>