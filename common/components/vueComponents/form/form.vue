<!-- 
  form组件
  传值固定格式：formData[{list:[{type: 'input',name: '姓名',check: "name"}]}]
 -->
<template>
  <div v-if="formData.length">
    <ul class='vueForm' v-for="(data,pIndex) in formData" v-if="data.list.length">
      <li v-for="(item,index) in data.list">
          <div v-if='item.type == "input"'>
            <form-input :item="item" :id="index"  :formParam="formParam" :preIndex="pIndex"></form-input>
          </div>
          <div v-else-if='item.type == "select"'>
            <form-select :item="item" :id="index" :formParam="formParam" :preIndex="pIndex"></form-select>
          </div>
          <div v-else-if='item.type == "textarea"'>
            <form-select :item="item" :id="index" :formParam="formParam" :preIndex="pIndex"></form-select>
          </div>
      </li>
      <li v-if="data.button">
        <form-add :formParam="formParam" :preIndex="pIndex" ></form-add>
      </li>
    </ul>
  </div>

</template>
<script>
import './form.js';
import formSelect from './select/select.vue';
import formInput from './input/input.vue';
import formAdd from './button/specialOperation/add.vue';

export default {
  name: 'vueForm',
  data(){
    return{
    }
  },
  props: {
    formData: {
      type: Array,
    },
    formParam:{
      type:String
    }

  },
  components: {
    formSelect,
    formInput,
    formAdd,
  },
  computed: {},
  methods: {}
}

</script>
<style lang="less">
@import './form.less';

</style>
