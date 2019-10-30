
<!-- 公共样式的类名为title，若想要自己改变某个单个的title的位置样式，可以传入class  进行更改 -->
<template>
	<div class='sectionTitle' :class='[titleClass]' >
		<span class='line'></span>
		<a class='word' :href='link'>{{titleText}}</a>
	</div>
</template>

<script>
export default { 
	name: 'titleLine', 
	props: { 
		titleText: { 
			type: String, 
			default: '' 
		}, 
		titleClass: { 
			type: String, 
			default: '' 
		}, 
		pid:{
			type: String,
			default: '' 
		},
		link:{
			type: String,
			default: 'javascript:;' 
		}
		
	},
	computed: { 
		// 控制按钮的类型 
		classType: function () { return this.titleClass ? `${this.titleClass}` : '' },  
	}
}
</script>

<style lang="less">
@import './titleLine.less';
</style>
