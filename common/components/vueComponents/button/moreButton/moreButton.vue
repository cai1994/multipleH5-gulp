<!-- 
	多个按钮并列的情况

	@author yangjinlai 2018-08-02

	适用场景：
	多个按钮并列，按钮与按钮间没有间距，每个按钮的高度都与父元素moreButton高度相等，宽度可自定义

	若按钮列表只传一个按钮，此组件也可只展示一个，效果同button.vue组件

	若按钮的宽度根据父元素moreButton的宽度平均分配，此时使用mui进行栅格化处理

	这个组件里的btnType与button.vue里的btnType是不同的值

	参数见props


 -->
<template>
	<div class="mui-row moreButton" :style="{ width:widthNum, height: heightNum , lineHeight: heightNum}">
		<vue-button v-for="button in buttonList" :btnType="button.btnType" :class='[buttonGrid]' :width="buttonGrid ? 'auto' : button.width" height="100%" :btnText="button.btnText" :clickFunction="button.btnFunction" :fontSize="button.fontSize"></vue-button>
	</div>
</template>

<script>

//区域标题
import vueButton  from '../button/button'

import util from '../../../../js/util/util'

export default { 
	name: 'moreButton', 
	components:{
      	vueButton
    },
	props: { 
		//按钮列表，可传参数：
		//[{
		//		btnType: btn_type_1/btn_type_2和font_type_1组合，如'btn_type_1 font_type_1'
		//		btnText: '按钮的文字'
		//		width: 按钮的宽度，可传百分比或数字，如果不传，默认是100%，
		//				组件会根据isGrid判断是否需要栅格化
		//}]
		buttonList: {
			type: Array, 
			default: [] 
		},
		//moreButton结构的宽度，可传带%的数据，或不带%的纯数字
		//如果传的数据不带%，组件里会自动加上'rem'，如果带%则不加'rem'
		//默认100%，全屏宽
		moreButtonwidth: {
			type: [String, Number],
			default: '100%' 
		},
		//moreButton结构的高度，格式同width一样
		//默认0.98rem
		moreButtonHeight: {
			type: [String, Number],
			default: 0.98
		},
		//是否栅格化设置里面每个按钮的宽度
		//默认true--是，平均分配
		//如果传false，会根据buttonList里的每个按钮的width设置宽度
		isGrid: {
			type: Boolean,
			default: true
		},
		//组件在页面中的位置，默认''-- 不固定，可以在页面less中自定义
		//如果传bottom，表示固定在底部 position fixed
		// position: {
		// 	type: String, 
		// 	default: '' 
		// },
	}, 
	computed: { 
		//计算moreButton结构的宽度
		widthNum :  function(){
			return util.getVarType.isString(this.moreButtonwidth) == 'string' && this.moreButtonwidth.indexOf('%') != -1 ? this.moreButtonwidth : this.moreButtonwidth + 'rem' 
		},  
		//计算moreButton结构的高度
		heightNum :  function () { 

			return util.getVarType.isString(this.moreButtonHeight) == 'string' && this.moreButtonHeight.indexOf('%') != -1 ? this.moreButtonHeight : this.moreButtonHeight + 'rem' 
		},  
		//设置每个按钮的宽度（根据moreButton的宽度进行平均分配）
		buttonGrid: function () { 
			if( this.isGrid && this.buttonList.length){
				//需要栅格化
				var l = 12/this.buttonList.length;
				return 'mui-col-sm-'+l+ ' mui-col-xs-'+l;
			}
		},  
		buttonWidth: function () { 
			if( !this.isGrid){
				//不需要栅格化
				return this.width;
			}
		},  
	} 
}
</script>

<style lang="less">
@import './moreButton.less';
</style>
