<!-- input 监听blur事件，更新数值，当select选择的时候，input并没有blur，待注意 -->
<template>
  <div class="form-ele mui-input-row form-input border-bottom">
    <label>{{name}}</label>
    <input :type="type" :check="check" :needCheck="needCheck" :placeholder="placeholder" :disabled="disabled" :errortip="errortip" :class='{"v-check":(needCheck==true)}' v-model="modelText" v-checkInput="{required:true,regex:'IpRegex'}" v-on:blur="valueHandler">
    <!-- v-on:input="valueHandler" -->
  </div>
</template>
<script>
import Event from '../common/event.js';
// 表单校验
import checkDirective from '../common/checkDirective.js';

export default {
  name: 'formInput',
  props: {
    item: {
      type: Object,
    },
    formParam: {
      type: String
    },
    preIndex: {
      type: Number
    },
    // 校验提示
  },

  data() {
    return {
      name: this.item.name || '',
      type: this.item.type || "text",
      placeholder: this.item.placeholder || '请输入',
      errortip: this.item.errortip || "请输入" + this.item.name,
      check: this.item.check || "isEmpty",
      disabled: (typeof(this.item.disabled) == 'undefined') ? false : this.item.disabled,
      needCheck: (typeof(this.item.needCheck) == 'undefined') ? true : this.item.needCheck,
      modelText: this.item.modelText,
      modelKey: this.item.modelKey,
    }
  },
  methods: {
    valueHandler() {
      console.log(this.modelText);
      Event.$emit('updateFormEle', this.formParam, this.modelKey, this.modelText, this.preIndex)
    }
  },
  directives: {
    checkInput: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el, binding, vNode) {
        // 校验
        checkDirective(el, binding, vNode);
      }
    }
  },
}

</script>
<style lang="less">
@import './input.less';

</style>
