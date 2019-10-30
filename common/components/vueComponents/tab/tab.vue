


<!-- /**
 * tab切换组件
 * @author  tianjunguo 2018-08-02
 */tabList是一个数组。数组有几个对象，tab头就几个。格式
  tabList: [
        {
          index: 0,
          name: '保障计划',
          component: 'one'
        },
        {
          index: 1,
          name: '投保须知',
          component: 'two'
        },
        {
          index: 2,
          name: '保险条款',
          component: 'three'
        },
        {
          index: 3,
          name: '服务详情',
          component: 'four'
        }
      ]
      index固定。name为对应每个tab头的内容。component为对应每个tabconent内容区。也就是sloat分发出去的组件。
 -->


<!-- tab切换 -->
<template>
    <div class="mytab">
        <div class="tab_div flexbox border-bottom">
          <!-- <div class="tabLine"></div> -->
          <div v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)">
              {{tab.name}}
          </div>
        </div>
        <div class="tabCon">
            <!-- slot内容分发 -->
            <slot></slot>
        </div>
    </div>

</template>

<script>
export default {
    name: 'MyTabs',
    props:
    {
      tabList: Array,//tab头的列表,在调用的页面写对应的数组和下标。使用页面可见web/views/index/detail/detail.vue
      tabIndex: Number,//tab头对应的下标。
    },
    data () {
      return {
      }
    },
    methods: {
      changeTab: function (tab) {
        this.$emit('changeTab', tab)//父组件向子组件传递参数。
      }
    }

}
</script>

<style lang="less">

@import './tab.less';

</style>
