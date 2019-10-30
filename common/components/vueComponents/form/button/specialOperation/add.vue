<!-- 
    表单新增保险人按钮
-->
<template>
  <div @click.prevent="addFunc">
    +新增被保险人
  </div>
</template>
<script>
//引用按钮组件
import Event from '../../common/event.js';

export default {
  name: 'addInsured',
  components: {},
  props: {
    formParam: {
      type: String
    },

  },
  data() {
    return {}
  },
  created() {
    // formParam 类型：3种，
    //  obj_demo;
    //  arr_demo; 
    //  空
    //  demo是实际参数值，obj_代表对象，arr_代表是数组，需要给数组赋值preIndex
    Event.$on('updateFormEle', (formParam, key, value, preIndex) => {
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
        this.model[key] = value;
      }
    })
  },
  methods: {
    addFunc: function() {
      debugger;
      // 新增一个被保险人对象
      this.$parent.formData.push(this.$parent.formData[0]);
      // model中新增一行
      Event.$emit('addFormOperation', this.formParam)
    },
  },
  computed: {}
}

</script>
<style lang="less">


</style>
