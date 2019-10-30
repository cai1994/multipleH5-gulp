<!-- 宽高默认为6.5 2.1，若需要改变宽高，可自行传入 -->
<template>
	<button type="button" class="btn" :class='[btnType]' @click="clickFunction" :num='number' :code='code' :style="{ width:widthNum, height: heightNum, fontSize: thisFontSize }" >{{ btnText }}</button>
</template>

<script>

import util from '../../../../js/util/util'


export default { 
	name: 'Button', 
	props: { 
		btnText: { 
			type: String, 
			default: '' 
		}, 
		width: { 
			type: String, 
			default: '1.3' 
		},
		height: { 
			type: String, 
			default: '0.46' 
		},
		btnType: { 
			type: String, 
			default: '' 
		},
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
	} 
}
</script>

<style lang="less">
@import './button.less';
</style>
