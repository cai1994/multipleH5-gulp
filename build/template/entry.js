/**
 * 页面入口文件
 *
 * gulpChanEntryName和gulpChanEntryFile替换为真正的名称

    gelpChanLess 为
    import '@common/less/color.less'
    import '@common/less/reset.less'
 */


import Vue from 'vue'
Vue.prototype.$Vue= Vue;

//入口文件，
import '@src/common/header/header.less'

import '@src/common/header/header.js'

import '@conf/CustomEventIE.js'

import '@conf/eruda.js'


//接口请求处理
//import  '@common/js/ajax/axios'

import axiosHttp from '@common/js/ajax/axiosHttp.js'
Vue.prototype.$axiosHttp = axiosHttp

//公用工具方法
import utils from '@common/js/vue/utils'
Vue.prototype.$utils = utils

// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import gulpChanEntryName from '@src/gulpChanEntryFile.vue'
//import router from '../router/taihang'
import lgbMd from '@common/js/md/lgbMd'

gulpChanLess

//公共组件
import loading from '@src/common/loading/loading.vue'
Vue.component('loading',loading)

// 通过用 Vue 函数创建一个新的 Vue 实例
// 一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成
// 由于项目是多页面，每个页面都需要有这么一个实例
new Vue({
    el: '#wrap',
    //router,
    components: { gulpChanEntryName ,lgbMd  },
    template: '<gulpChanEntryName/>'
})