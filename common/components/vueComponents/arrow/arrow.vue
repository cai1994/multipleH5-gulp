<!-- 三角箭头-->
<template>
	<span class="arrow" :arrow='[arrowStatus]' @click="clickFunction($event)"></span>
</template>

<script>

//输出当前页面的组件
export default {
	name: 'arrow', 
	props: { 
		//箭头样式
		//默认向上
		//添加bottom class--向下
		//等等
		// arrowType: {
		// 	type: String,
		// 	default: 'arrow'
		// },
		//控制展开收起的状态
		//默认为open，展开状态，如果为close，为收起状态
		arrowStatus: {
			type: String, 
			default: 'open' 
		},
		clickFunction: {
			type: Function, 
			default: function(){}
		}
	},
	// data() {
	//   	return { 
	//   		clickFunc: this.clickFunction ,

	//   	};
	// },
    // methods: {
    // 	//点击切换展开收起状态
    //     change: function () {
	   //      //触发父组件的change方法
    //     	this.$emit.change();
    //     }
    // }
}
</script>

<style lang="less">
@import './arrow.less';
</style>