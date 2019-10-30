<!-- 
	投保详情预约单号展示
-->

<template>
	<section class="number_box">
		<!-- 预约单号 -->
	    <div  :class="[itemsType == 'type_1' ? 'number border-bottom' : 'number']">
	     <span>{{numItems.number1}}</span>
	     <span class="status">{{numItems.status}}</span>
	    </div>
	    <div class="number_con1 number_con clearfix" v-if="!!tshow">
	      <div class="number_tit">{{numItems.title2}}</div>
	      <div class="number_matter t_number">{{numItems.number2}}</div>
	    </div>
	    <div class="number_con2 number_con clearfix" v-if="!!bshow">
	      <div class="number_tit ">{{numItems.title3}}</div>
	      <div class="number_matter b_number"><a :href='numItems.numhref' target="_blank">{{numItems.number3}}</a></div>
	    </div>
	</section>
</template>

<script>
export default { 
	name: 'vueNumber', 
	props: {
		numItems: { 
			type: Object, 
			default: {} 
		},
		tshow: {
			type: String,
			default: ''
		},
		bshow: {
			type: String,
			default: ''
		},
		itemsType:{
			type: String, 
			default: 'type_1'
		},
	},
	
}
</script>

<style lang="less">
@import './number.less';
</style>
