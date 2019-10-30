<!-- 
	复选框 
-->

<template>
	<div class="check">
		<div class="checkBox">
		    <input type="checkbox" :checked="isCheck" @change="clickFunction">
		    <label class="iconfont"></label>
		</div>
		<span v-if="!!description">{{description}}</span>
	</div>
</template>

<script>
export default { 
	name: 'check', 
	props: {
		//是否默认选中
		//默认false--不选中
		isCheck: {
			type: [Boolean, String],
			default: false 
		},
		//文案
		//默认''，无值
		description: {
			type: String,
			default: '' 
		},
		//状态改变后执行的回调
		checkClickFunc: {
			type: Function,
			default: function(){}
		}
	},
	data(){
		var that = this;
		
		return {
			clickFunction : function(e){

				//调用回调函数，且传$(e.target)为参数
				that.checkClickFunc($(e.target));
			}
		}
	}
}
</script>

<style lang="less">
@import './check.less';
</style>
