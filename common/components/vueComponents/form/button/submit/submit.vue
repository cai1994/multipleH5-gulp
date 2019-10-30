<!--
    表单提交按钮
    需请求接口，callback
-->
<template>
  <div :model="model" @click.prevent="submitFunc">
    <vue-button
    :btnText="btnText"
    :btnType='btnType'
    :width="buttonGrid ? 'auto' : width"
    :fontSize="fontSize"
    :class='[buttonGrid]'
    height="100%">
    </vue-button>
  </div>
</template>
  <!-- v-checkSubmit="{model:model,func:callback}"  -->
</template>
<script>
//引用按钮组件
import vueButton from '../../../button/button/button';
import Event from '../../common/event.js';

export default {
  name: 'formSubmit',
  components: {
    vueButton,
  },
  props: {
    btnText: {
      type: String,
    },
    btnType: {
      type: String,
      default: 'type_4'
    },
    //按钮宽度
    //默认
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    model: {
      type: Object,
    },
    callback: {},
    number:{
      type: String,
      default: ''
    },
    code:{
      type: String,
      default: ''
    },
    clickFunction:{
      type: Function,
      default: function(){}
    },
    fontSize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {
    /**
     * [input,select操作时，更新model值]
     * @author songxiaoyu 2018-08-15
     * @param  {[type]} 'formParam' [formData外层的key值，跟model对应；3种，空，obj_demo,arr_demo;demo是实际参数，obj_代表对象，arr_代表数组]
     * @param  {[type]} 'key' [操作元素的key值]
     * @param  {[type]} 'value' [操作元素的新值]
     * @param  {[type]} 'preIndex' [操作元素的父节点；如果是多层数组，给对应的数组复制]
     * @return {[type]}  [description]
     */
    Event.$on('updateFormEle', (formParam, key, value, preIndex) => {
      // 有formParam
      if (formParam) {
        var num = formParam.indexOf('_'),
          param = formParam.slice(num + 1);
        if (formParam.slice(0, num) == 'obj') {
          // 对象型
          this.model[param][key] = value;
        } else if (formParam.slice(0, num) == 'arr') {
          // 数组型
          this.model[param][preIndex][key] = value;
        }
      } else {
        // 没有formParam,model
        this.model[key] = value;
      }
    });
    // 监听add操作，给model新增一个对象
    Event.$on('addFormOperation', (formParam, key, value, preIndex) => {
      var num = formParam.indexOf('_'),
        param = formParam.slice(num + 1);
      this.model[param].push(this.model[param][0])
    })
  },
  methods: {
    submitFunc: function() {
      console.log('submitfunc', this.model)

      // let elements = document.getElementsByClassName('v-check')
      var  elements = $('.v-check');
      var evObj = document.createEvent('Event')
      evObj.initEvent('checkForm', true, true)

      for (var element in elements) {
        (function(element) {
          // if (document.all.length) {
          //   element.fireEvent(evObj);
          // }
          // else{
            element.dispatchEvent(evObj)
          //}
          //element.dispatchEvent(evObj)
        })(elements[element])

        if (elements[element].className.indexOf('input-error') != -1) {
          return false;
        } else {
          // 校验通过
          this.callback();
        }
      }
    },
  },
  computed: {
    //设置按钮宽度
    widthNum :  function () {
      return util.getVarType.isString(this.width) == 'string' && this.width.indexOf('%') != -1 ? this.width : this.width + 'rem'
    },
    //设置按钮高度
    heightNum :  function () {
      return util.getVarType.isString(this.height) == 'string' &&  this.height.indexOf('%') != -1 ? this.height : this.height + 'rem'
    },
    //字体大小
    thisFontSize: function () {
      return !!this.fontSize ? this.fontSize+'rem' : '';
    },
    //设置每个按钮的宽度（根据moreButton的宽度进行平均分配）
    buttonGrid: function () {
      if( this.isGrid && this.buttonList.length){
        //需要栅格化
        var l = 12/this.buttonList.length;
        return 'mui-col-sm-'+l+ ' mui-col-xs-'+l;
      }
    },
  }
}

</script>
<style lang="less">


</style>
