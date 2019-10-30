<!--
	左边状态展示，右边按钮的情况

	@author yangjinlai 2018-08-02

	参数见props
 -->
<template>
	<div class="statusButton" :style="{ width:widthNum, height: heightNum , lineHeight: heightNum}">
		<div class="status">{{result}}</div>
		<vue-button :btnType="btnType" :width="width" height="100%" :btnText="btnText" :clickFunction="clickFunction"></vue-button>
	</div>
</template>

<script>

//按钮
import vueButton  from '../button/button'

import util from '../../../../js/util/util'

export default {
	name: 'statusButton',
	components:{
      	vueButton
    },
	props: {
		//展示在左边status区域
		//默认''-- 无值
		result: {
			type: String,
			default: ''
		},
		//按钮文案
		btnText: {
			type: String,
			default: ''
		},
		//整个结构的宽度
		//默认100%
		statusButtonWidth: {
			type: [String, Number],
			default: '100%'
		},
		//结构的高度，格式同width一样
		//默认0.98rem
		statusButtonHeight: {
			type: [String, Number],
			default: 0.98
		},
		//按钮宽度
		//默认
		width: {
			type: String,
			default: '50%'
		},
		//按钮类型
		//默认第四种，方形按钮，黄色背景棕色文字
		btnType: {
			type: String,
			default: 'type_4'
		},
		clickFunction:{
			type: Function, 
			default: function(){}
		},
	},
	computed: {
		//计算moreButton结构的宽度
		widthNum :  function(){
			return util.getVarType.isString(this.statusButtonWidth) == 'string' && this.statusButtonWidth.indexOf('%') != -1 ? this.statusButtonWidth : this.statusButtonWidth + 'rem'
		},
		//计算moreButton结构的高度
		heightNum :  function () {

			return util.getVarType.isString(this.statusButtonHeight) == 'string' && this.statusButtonHeight.indexOf('%') != -1 ? this.statusButtonHeight : this.statusButtonHeight + 'rem'
		}
	}
}
</script>

<style lang="less">
@import './statusButton.less';
</style>
