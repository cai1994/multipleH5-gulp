<!-- 
  select 根据check决定渲染哪个元素 
  a标签click事件不起作用，故使用指令
  check:select类型，分2种，1是固定数据，2是需请求接口的数据，请求接口的select,chec命名前加get_;
-->
<template>
  <div class="form-ele form-select border-bottom">
    <label>{{name}}</label>
    <ul class="mui-table-view" :class='check'>
      <li class="mui-table-view-cell mui-collapse">
        <a href="javascript:;" 
           class="mui-navigate-right" 
           num="" 
           :needCheck="needCheck" 
           :check="check" 
           :errortip="errortip" 
           :class="classObject" 
           :selectType="selectType" 
           v-checkSelect="{modelText:modelText}"
        >
            {{modelText}}
        </a>
          <!--  v-checkSelect="{modelText:modelText}"  -->
      </li>
    </ul>
  </div>
</template>
<script>
import '../../../../../web/include/vendor/mui/mui.picker.min.js';
import popPicker from '../../../muiComponents/muiPop/muiPopPicker.js'
import Event from '../common/event.js';
import selectFunc from './select.js';
// select请求接口
import getApiData from './json/getApiData.js';
// 表单校验
import checkDirective from '../common/checkDirective.js';

export default {
  name: 'formSelect',
  props: {
    item: {
      type: Object,
    },
    formParam:{
      type:String,
    },
    preIndex:{
      type:Number
    }
  },
  data() {
    return {
      name: this.item.name,
      placeholder: this.item.placeholder || '请输入placeholder',
      errortip: this.item.placeholder || "请输入" + this.item.name,
      // 值校验
      check: this.item.check || "isEmpty",
      // 下拉框类型，必传
      selectType: this.item.selectType,
      needCheck: (typeof(this.item.needCheck) == 'undefined') ? true : this.item.check,
      modelKey:this.item.modelKey,
      modelText: this.item.modelText || '请选择',
      selectData:[]
    }
  },
  created(){
    if(this.selectType.indexOf('get_') == 0){
      
      // 如果是get_类型的，请求接口，保存数据
      this.selectData = getApiData(this.selectType);
    }
  },
  /*methods: {
    saveValueHandler: function() {
      this.moduleTxt = this.moduleTxt;
      Event.$emit('updateFormEle',this.formParam,this.modelKey,this.modelText,this.preIndex)
    },
  },*/
  watch: {
    // 监听modelText的值
    modelText: function (val) {
      Event.$emit('updateFormEle',this.formParam,this.modelKey,this.modelText,this.preIndex)
    },
  },
  computed: {
    // 计算属性
    classObject: function() {
      return {
        "v-check": this.needCheck
      }
    },
  },
  directives: {
    checkSelect: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el, binding, vNode) {
        el.addEventListener('tap', function(event) {
          // new poppic
          selectFunc(el, binding, vNode);
        })

        checkDirective(el, binding, vNode);
      }
    },
  },
}

</script>
<style lang="less">
@import './select.less';

</style>
